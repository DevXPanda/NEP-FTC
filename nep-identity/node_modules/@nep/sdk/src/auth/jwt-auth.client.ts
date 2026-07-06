// JWT auth client — verifies access tokens and extracts NEP's scoped claims for authorization.
import * as jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';

/** Type of scope a token is bound to (e.g. an organization, branch, or warehouse). */
export type ScopeType = 'global' | 'organization' | 'branch' | 'warehouse' | string;

/** Normalized principal extracted from a verified NEP access token. */
export interface ScopedClaims {
  userId: string;
  tenantId: string;
  roles: string[];
  /** What kind of entity the token is scoped to. */
  scopeType: ScopeType;
  /** Identifier of the scoped entity (null for global scope). */
  scopeId: string | null;
}

export interface JwtAuthClientOptions {
  /**
   * Verification material. Provide a symmetric `secret` (HS256) OR an async
   * `getPublicKey`/JWKS resolver (RS256) — resolved from the platform config.
   */
  secret?: string;
  jwksUri?: string;
  issuer?: string;
  audience?: string;
  /** Clock skew tolerance in seconds. */
  clockToleranceSec?: number;
}

export interface JwtAuthClient {
  /**
   * Verifies the token signature/expiry/issuer/audience and returns normalized claims.
   * Throws {@link UnauthorizedError} on any failure.
   */
  verify(token: string): Promise<ScopedClaims>;

  /** Verifies then asserts the principal holds the given scope; throws UnauthorizedError otherwise. */
  requireScope(token: string, scopeType: ScopeType, scopeId: string): Promise<ScopedClaims>;
}

/** Raw JWT payload shape produced by nep-identity's token service. */
interface RawClaims extends jwt.JwtPayload {
  sub?: string;
  tid?: string;
  roles?: string[];
  scope_type?: string;
  scope_id?: string | null;
}

/** Maps verified raw JWT claims onto the normalized {@link ScopedClaims} principal. */
function mapClaims(raw: RawClaims): ScopedClaims {
  if (!raw.sub || !raw.tid) {
    throw new UnauthorizedError('Token is missing required claims (sub, tid)');
  }
  return {
    userId: raw.sub,
    tenantId: raw.tid,
    roles: Array.isArray(raw.roles) ? raw.roles : [],
    scopeType: raw.scope_type ?? 'global',
    scopeId: raw.scope_id ?? null,
  };
}

/**
 * Creates the JWT auth client. Verifies signature/expiry/issuer/audience with jsonwebtoken
 * (HS256 via `secret`) and normalizes claims. Raises {@link UnauthorizedError} on any failure.
 *
 * Note: RS256/JWKS verification (`jwksUri`) is not yet implemented — provide `secret` for HS256.
 */
export function createJwtAuthClient(options: JwtAuthClientOptions): JwtAuthClient {
  if (!options.secret) {
    // JWKS/RS256 path is a follow-up; fail loudly rather than silently accepting tokens.
    throw new Error('createJwtAuthClient currently requires an HS256 `secret` (jwksUri not yet supported)');
  }
  const secret = options.secret;

  const verifyOptions: jwt.VerifyOptions = {
    algorithms: ['HS256'],
    issuer: options.issuer,
    audience: options.audience,
    clockTolerance: options.clockToleranceSec,
  };

  async function verify(token: string): Promise<ScopedClaims> {
    let decoded: string | jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, secret, verifyOptions);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'verification failed';
      throw new UnauthorizedError(`Invalid token: ${reason}`);
    }
    if (typeof decoded === 'string') {
      throw new UnauthorizedError('Invalid token: unexpected payload');
    }
    return mapClaims(decoded as RawClaims);
  }

  return {
    verify,
    async requireScope(token: string, scopeType: ScopeType, scopeId: string): Promise<ScopedClaims> {
      const claims = await verify(token);
      if (claims.scopeType !== scopeType || claims.scopeId !== scopeId) {
        throw new UnauthorizedError('Token does not grant the required scope', {
          required: { scopeType, scopeId },
          actual: { scopeType: claims.scopeType, scopeId: claims.scopeId },
        } as Record<string, unknown>);
      }
      return claims;
    },
  };
}
