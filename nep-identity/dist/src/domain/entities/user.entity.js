"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const node_crypto_1 = require("node:crypto");
const sdk_1 = require("@nep/sdk");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
class User {
    constructor(props) {
        this.props = props;
    }
    static create(input) {
        const email = input.email.trim().toLowerCase();
        if (!input.tenantId) {
            throw new sdk_1.ValidationError('tenantId is required');
        }
        if (!EMAIL_RE.test(email)) {
            throw new sdk_1.ValidationError('A valid email is required', { email: input.email });
        }
        if (!input.passwordHash) {
            throw new sdk_1.ValidationError('passwordHash is required');
        }
        if (input.scopeType !== 'global' && !input.scopeId) {
            throw new sdk_1.ValidationError('scopeId is required for non-global scope', {
                scopeType: input.scopeType,
            });
        }
        const now = new Date();
        return new User({
            id: (0, node_crypto_1.randomUUID)(),
            tenantId: input.tenantId,
            email,
            passwordHash: input.passwordHash,
            roles: input.roles ?? [],
            scopeType: input.scopeType,
            scopeId: input.scopeType === 'global' ? null : input.scopeId ?? null,
            status: 'active',
            createdAt: now,
            updatedAt: now,
        });
    }
    static fromPersistence(props) {
        return new User({ ...props });
    }
    get id() {
        return this.props.id;
    }
    get tenantId() {
        return this.props.tenantId;
    }
    get email() {
        return this.props.email;
    }
    get passwordHash() {
        return this.props.passwordHash;
    }
    get roles() {
        return [...this.props.roles];
    }
    get scopeType() {
        return this.props.scopeType;
    }
    get scopeId() {
        return this.props.scopeId;
    }
    get status() {
        return this.props.status;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    isActive() {
        return this.props.status === 'active';
    }
    scopedClaims() {
        return {
            userId: this.props.id,
            tenantId: this.props.tenantId,
            roles: [...this.props.roles],
            scopeType: this.props.scopeType,
            scopeId: this.props.scopeId,
        };
    }
    changePassword(newPasswordHash) {
        if (!newPasswordHash) {
            throw new sdk_1.ValidationError('passwordHash is required');
        }
        this.props.passwordHash = newPasswordHash;
        this.props.updatedAt = new Date();
    }
    suspend() {
        this.props.status = 'suspended';
        this.props.updatedAt = new Date();
    }
    toPrimitives() {
        return { ...this.props, roles: [...this.props.roles] };
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map