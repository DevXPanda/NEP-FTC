// Domain port — repository interface for RefreshToken. Implemented in infrastructure/.
import { RefreshTokenEntity } from '../entities/refresh-token.entity';

export const REFRESH_TOKEN_REPOSITORY = Symbol('REFRESH_TOKEN_REPOSITORY');

export interface IRefreshTokenRepository {
  /** Inserts or updates the refresh token record (idempotent by id). */
  save(token: RefreshTokenEntity): Promise<void>;

  /** Looks up an active/inactive token by its hash within a tenant. */
  findByHash(tenantId: string, tokenHash: string): Promise<RefreshTokenEntity | null>;

  /** Revokes every refresh token for a user (e.g. on logout-all / password change). */
  revokeAllForUser(tenantId: string, userId: string): Promise<void>;
}
