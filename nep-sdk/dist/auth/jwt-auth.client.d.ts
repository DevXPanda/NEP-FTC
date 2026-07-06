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
/**
 * Creates the JWT auth client. Verifies signature/expiry/issuer/audience with jsonwebtoken
 * (HS256 via `secret`) and normalizes claims. Raises {@link UnauthorizedError} on any failure.
 *
 * Note: RS256/JWKS verification (`jwksUri`) is not yet implemented — provide `secret` for HS256.
 */
export declare function createJwtAuthClient(options: JwtAuthClientOptions): JwtAuthClient;
//# sourceMappingURL=jwt-auth.client.d.ts.map