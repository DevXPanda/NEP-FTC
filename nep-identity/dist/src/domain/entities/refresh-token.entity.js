"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenEntity = void 0;
const node_crypto_1 = require("node:crypto");
const sdk_1 = require("@nep/sdk");
class RefreshTokenEntity {
    constructor(props) {
        this.props = props;
    }
    static issue(input) {
        if (!input.tokenHash) {
            throw new sdk_1.ValidationError('tokenHash is required');
        }
        return new RefreshTokenEntity({
            id: (0, node_crypto_1.randomUUID)(),
            tenantId: input.tenantId,
            userId: input.userId,
            sessionId: input.sessionId ?? null,
            tokenHash: input.tokenHash,
            expiresAt: input.expiresAt,
            revokedAt: null,
            createdAt: new Date(),
        });
    }
    static fromPersistence(props) {
        return new RefreshTokenEntity({ ...props });
    }
    get id() {
        return this.props.id;
    }
    get tenantId() {
        return this.props.tenantId;
    }
    get userId() {
        return this.props.userId;
    }
    get tokenHash() {
        return this.props.tokenHash;
    }
    isActive(now = new Date()) {
        return this.props.revokedAt === null && this.props.expiresAt.getTime() > now.getTime();
    }
    revoke() {
        if (this.props.revokedAt === null) {
            this.props.revokedAt = new Date();
        }
    }
    toPrimitives() {
        return { ...this.props };
    }
}
exports.RefreshTokenEntity = RefreshTokenEntity;
//# sourceMappingURL=refresh-token.entity.js.map