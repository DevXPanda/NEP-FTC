// Application port — token issuance. Implemented in infrastructure/ (JWT + hashed refresh tokens).
import type { UserScopedClaims } from '../../domain/entities/user.entity';

export const TOKEN_SERVICE = Symbol('TOKEN_SERVICE');

export interface IssuedAccessToken {
  token: string;
  /** Lifetime in seconds. */
  expiresIn: number;
}

export interface IssuedRefreshToken {
  /** The opaque token handed to the client. */
  token: string;
  /** SHA-256 of the token — this is what gets persisted. */
  hash: string;
  expiresAt: Date;
}

export interface ITokenService {
  /** Signs a JWT access token carrying the scoped claims. */
  issueAccessToken(claims: UserScopedClaims): Promise<IssuedAccessToken>;

  /** Mints a new opaque refresh token plus its hash. */
  issueRefreshToken(): IssuedRefreshToken;

  /** Hashes a raw refresh token the same way issueRefreshToken() does (for lookup). */
  hashRefreshToken(token: string): string;
}
