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
exports.JwtTokenService = exports.JWT_ISSUER = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_crypto_1 = require("node:crypto");
const jwt = require("jsonwebtoken");
exports.JWT_ISSUER = 'nep-identity';
let JwtTokenService = class JwtTokenService {
    constructor(config) {
        this.config = config;
    }
    async issueAccessToken(claims) {
        const secret = this.config.getOrThrow('jwt.secret');
        const expiresIn = this.config.get('jwt.accessTtlSec', 900);
        const token = jwt.sign({
            tid: claims.tenantId,
            roles: claims.roles,
            scope_type: claims.scopeType,
            scope_id: claims.scopeId,
        }, secret, {
            subject: claims.userId,
            issuer: exports.JWT_ISSUER,
            expiresIn,
        });
        return { token, expiresIn };
    }
    issueRefreshToken() {
        const token = (0, node_crypto_1.randomBytes)(48).toString('hex');
        const ttlSec = this.config.get('jwt.refreshTtlSec', 60 * 60 * 24 * 30);
        return {
            token,
            hash: this.hashRefreshToken(token),
            expiresAt: new Date(Date.now() + ttlSec * 1000),
        };
    }
    hashRefreshToken(token) {
        return (0, node_crypto_1.createHash)('sha256').update(token).digest('hex');
    }
};
exports.JwtTokenService = JwtTokenService;
exports.JwtTokenService = JwtTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtTokenService);
//# sourceMappingURL=jwt-token.service.js.map