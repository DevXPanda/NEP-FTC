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
exports.LoginUserHandler = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const sdk_1 = require("@nep/sdk");
const user_repository_interface_1 = require("../../domain/repositories/user.repository.interface");
const refresh_token_repository_interface_1 = require("../../domain/repositories/refresh-token.repository.interface");
const refresh_token_entity_1 = require("../../domain/entities/refresh-token.entity");
const user_logged_in_event_1 = require("../../domain/events/user-logged-in.event");
const password_hasher_port_1 = require("../ports/password-hasher.port");
const token_service_port_1 = require("../ports/token.service.port");
const event_publisher_port_1 = require("../ports/event-publisher.port");
let LoginUserHandler = class LoginUserHandler {
    constructor(users, refreshTokens, hasher, tokens, events) {
        this.users = users;
        this.refreshTokens = refreshTokens;
        this.hasher = hasher;
        this.tokens = tokens;
        this.events = events;
    }
    async execute(command) {
        const email = command.email.trim().toLowerCase();
        const user = await this.users.findByEmail(command.tenantId, email);
        if (!user || !(await this.hasher.compare(command.password, user.passwordHash))) {
            throw new sdk_1.UnauthorizedError('Invalid credentials');
        }
        if (!user.isActive()) {
            throw new sdk_1.UnauthorizedError('Account is not active');
        }
        const access = await this.tokens.issueAccessToken(user.scopedClaims());
        const refresh = this.tokens.issueRefreshToken();
        await this.refreshTokens.save(refresh_token_entity_1.RefreshTokenEntity.issue({
            tenantId: user.tenantId,
            userId: user.id,
            tokenHash: refresh.hash,
            expiresAt: refresh.expiresAt,
        }));
        const payload = {
            userId: user.id,
            tenantId: user.tenantId,
            occurredAt: new Date().toISOString(),
        };
        await this.events.publish({
            id: (0, node_crypto_1.randomUUID)(),
            type: user_logged_in_event_1.USER_LOGGED_IN,
            version: 1,
            data: payload,
            occurredAt: payload.occurredAt,
        });
        return {
            accessToken: access.token,
            refreshToken: refresh.token,
            tokenType: 'Bearer',
            expiresIn: access.expiresIn,
        };
    }
};
exports.LoginUserHandler = LoginUserHandler;
exports.LoginUserHandler = LoginUserHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_repository_interface_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(refresh_token_repository_interface_1.REFRESH_TOKEN_REPOSITORY)),
    __param(2, (0, common_1.Inject)(password_hasher_port_1.PASSWORD_HASHER)),
    __param(3, (0, common_1.Inject)(token_service_port_1.TOKEN_SERVICE)),
    __param(4, (0, common_1.Inject)(event_publisher_port_1.EVENT_PUBLISHER)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], LoginUserHandler);
//# sourceMappingURL=login-user.handler.js.map