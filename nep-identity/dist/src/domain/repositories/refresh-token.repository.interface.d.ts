import { RefreshTokenEntity } from '../entities/refresh-token.entity';
export declare const REFRESH_TOKEN_REPOSITORY: unique symbol;
export interface IRefreshTokenRepository {
    save(token: RefreshTokenEntity): Promise<void>;
    findByHash(tenantId: string, tokenHash: string): Promise<RefreshTokenEntity | null>;
    revokeAllForUser(tenantId: string, userId: string): Promise<void>;
}
