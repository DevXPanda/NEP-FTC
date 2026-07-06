import { IRefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { RefreshTokenEntity } from '../../../domain/entities/refresh-token.entity';
import { PrismaService } from '../prisma.service';
export declare class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    save(token: RefreshTokenEntity): Promise<void>;
    findByHash(tenantId: string, tokenHash: string): Promise<RefreshTokenEntity | null>;
    revokeAllForUser(tenantId: string, userId: string): Promise<void>;
    private toDomain;
}
