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
exports.PrismaUserRepository = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../../domain/entities/user.entity");
const prisma_service_1 = require("../prisma.service");
let PrismaUserRepository = class PrismaUserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(tenantId, id) {
        const row = await this.prisma.user.findFirst({ where: { id, tenantId } });
        return row ? this.toDomain(row) : null;
    }
    async findByEmail(tenantId, email) {
        const row = await this.prisma.user.findUnique({
            where: { tenantId_email: { tenantId, email: email.toLowerCase() } },
        });
        return row ? this.toDomain(row) : null;
    }
    async existsByEmail(tenantId, email) {
        const count = await this.prisma.user.count({
            where: { tenantId, email: email.toLowerCase() },
        });
        return count > 0;
    }
    async save(user) {
        const p = user.toPrimitives();
        await this.prisma.user.upsert({
            where: { id: p.id },
            create: {
                id: p.id,
                tenantId: p.tenantId,
                email: p.email,
                passwordHash: p.passwordHash,
                roles: p.roles,
                scopeType: p.scopeType,
                scopeId: p.scopeId,
                status: p.status,
                createdAt: p.createdAt,
                updatedAt: p.updatedAt,
            },
            update: {
                email: p.email,
                passwordHash: p.passwordHash,
                roles: p.roles,
                scopeType: p.scopeType,
                scopeId: p.scopeId,
                status: p.status,
                updatedAt: p.updatedAt,
            },
        });
    }
    toDomain(row) {
        const props = {
            id: row.id,
            tenantId: row.tenantId,
            email: row.email,
            passwordHash: row.passwordHash,
            roles: row.roles,
            scopeType: row.scopeType,
            scopeId: row.scopeId,
            status: row.status,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        };
        return user_entity_1.User.fromPersistence(props);
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUserRepository);
//# sourceMappingURL=user.repository.js.map