"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaRefreshTokenRepository = void 0;
const common_1 = require("@nestjs/common");
const refresh_token_entity_1 = require("../../../domain/entities/refresh-token.entity");
const prisma_service_1 = require("../prisma.service");
let PrismaRefreshTokenRepository = class PrismaRefreshTokenRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async save(token) {
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
    async findByHash(tenantId, tokenHash) {
        const row = await this.prisma.refreshToken.findFirst({ where: { tenantId, tokenHash } });
        return row ? this.toDomain(row) : null;
    }
    async revokeAllForUser(tenantId, userId) {
        await this.prisma.refreshToken.updateMany({
            where: { tenantId, userId, revokedAt: null },
            data: { revokedAt: new Date() },
        });
    }
    toDomain(row) {
        const props = {
            id: row.id,
            tenantId: row.tenantId,
            userId: row.userId,
            sessionId: row.sessionId,
            tokenHash: row.tokenHash,
            expiresAt: row.expiresAt,
            revokedAt: row.revokedAt,
            createdAt: row.createdAt,
        };
        return refresh_token_entity_1.RefreshTokenEntity.fromPersistence(props);
    }
};
exports.PrismaRefreshTokenRepository = PrismaRefreshTokenRepository;
exports.PrismaRefreshTokenRepository = PrismaRefreshTokenRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaRefreshTokenRepository);
//# sourceMappingURL=refresh-token.repository.js.map