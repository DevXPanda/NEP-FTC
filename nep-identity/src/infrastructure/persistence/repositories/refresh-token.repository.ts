// Infrastructure — Prisma implementation of the domain IRefreshTokenRepository port.
import { Injectable } from '@nestjs/common';
import { IRefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import {
  RefreshTokenEntity,
  type RefreshTokenProps,
} from '../../../domain/entities/refresh-token.entity';
import { PrismaService } from '../prisma.service';

interface RefreshTokenRow {
  id: string;
  tenantId: string;
  userId: string;
  sessionId: string | null;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
}

@Injectable()
export class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(token: RefreshTokenEntity): Promise<void> {
    const p = token.toPrimitives();
    await this.prisma.refreshToken.upsert({
      where: { id: p.id },
      create: {
        id: p.id,
        tenantId: p.tenantId,
        userId: p.userId,
        sessionId: p.sessionId,
        tokenHash: p.tokenHash,
        expiresAt: p.expiresAt,
        revokedAt: p.revokedAt,
        createdAt: p.createdAt,
      },
      update: {
        revokedAt: p.revokedAt,
        expiresAt: p.expiresAt,
      },
    });
  }

  async findByHash(tenantId: string, tokenHash: string): Promise<RefreshTokenEntity | null> {
    const row = await this.prisma.refreshToken.findFirst({ where: { tenantId, tokenHash } });
    return row ? this.toDomain(row) : null;
  }

  async revokeAllForUser(tenantId: string, userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { tenantId, userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  private toDomain(row: RefreshTokenRow): RefreshTokenEntity {
    const props: RefreshTokenProps = {
      id: row.id,
      tenantId: row.tenantId,
      userId: row.userId,
      sessionId: row.sessionId,
      tokenHash: row.tokenHash,
      expiresAt: row.expiresAt,
      revokedAt: row.revokedAt,
      createdAt: row.createdAt,
    };
    return RefreshTokenEntity.fromPersistence(props);
  }
}
