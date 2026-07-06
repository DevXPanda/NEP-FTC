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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenHandler = void 0;
const common_1 = require("@nestjs/common");
const sdk_1 = require("@nep/sdk");
const user_repository_interface_1 = require("../../domain/repositories/user.repository.interface");
const refresh_token_repository_interface_1 = require("../../domain/repositories/refresh-token.repository.interface");
const refresh_token_entity_1 = require("../../domain/entities/refresh-token.entity");
const token_service_port_1 = require("../ports/token.service.port");
let RefreshTokenHandler = class RefreshTokenHandler {
    constructor(users, refreshTokens, tokens) {
        this.users = users;
        this.refreshTokens = refreshTokens;
        this.tokens = tokens;
    }
    async execute(command) {
        const hash = this.tokens.hashRefreshToken(command.refreshToken);
        const stored = await this.refreshTokens.findByHash(command.tenantId, hash);
        if (!stored || !stored.isActive()) {
            throw new sdk_1.UnauthorizedError('Invalid or expired refresh token');
        }
        const user = await this.users.findById(command.tenantId, stored.userId);
        if (!user || !user.isActive()) {
            throw new sdk_1.UnauthorizedError('Invalid or expired refresh token');
        }
        stored.revoke();
        await this.refreshTokens.save(stored);
        const access = await this.tokens.issueAccessToken(user.scopedClaims());
        const refresh = this.tokens.issueRefreshToken();
        await this.refreshTokens.save(refresh_token_entity_1.RefreshTokenEntity.issue({
            tenantId: user.tenantId,
            userId: user.id,
            tokenHash: refresh.hash,
            expiresAt: refresh.expiresAt,
        }));
        return {
            accessToken: access.token,
            refreshToken: refresh.token,
            tokenType: 'Bearer',
            expiresIn: access.expiresIn,
        };
    }
};
exports.RefreshTokenHandler = RefreshTokenHandler;
exports.RefreshTokenHandler = RefreshTokenHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_repository_interface_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(refresh_token_repository_interface_1.REFRESH_TOKEN_REPOSITORY)),
    __param(2, (0, common_1.Inject)(token_service_port_1.TOKEN_SERVICE)),
    __metadata("design:paramtypes", [Object, Object, Object])
], RefreshTokenHandler);
//# sourceMappingURL=refresh-token.handler.js.map