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
exports.RegisterUserHandler = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const sdk_1 = require("@nep/sdk");
const user_entity_1 = require("../../domain/entities/user.entity");
const user_repository_interface_1 = require("../../domain/repositories/user.repository.interface");
const user_registered_event_1 = require("../../domain/events/user-registered.event");
const password_hasher_port_1 = require("../ports/password-hasher.port");
const event_publisher_port_1 = require("../ports/event-publisher.port");
let RegisterUserHandler = class RegisterUserHandler {
    constructor(users, hasher, events) {
        this.users = users;
        this.hasher = hasher;
        this.events = events;
    }
    async execute(command) {
        const email = command.email.trim().toLowerCase();
        if (await this.users.existsByEmail(command.tenantId, email)) {
            throw new sdk_1.ValidationError('Email is already registered', { email });
        }
        const passwordHash = await this.hasher.hash(command.password);
        const user = user_entity_1.User.create({
            tenantId: command.tenantId,
            email,
            passwordHash,
            roles: command.roles,
            scopeType: command.scopeType,
            scopeId: command.scopeId,
        });
        await this.users.save(user);
        const payload = {
            userId: user.id,
            tenantId: user.tenantId,
            email: user.email,
            roles: user.roles,
            scopeType: user.scopeType,
            scopeId: user.scopeId,
            occurredAt: new Date().toISOString(),
        };
        await this.events.publish({
            id: (0, node_crypto_1.randomUUID)(),
            type: user_registered_event_1.USER_REGISTERED,
            version: 1,
            data: payload,
            occurredAt: payload.occurredAt,
        });
        return { userId: user.id };
    }
};
exports.RegisterUserHandler = RegisterUserHandler;
exports.RegisterUserHandler = RegisterUserHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_repository_interface_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(password_hasher_port_1.PASSWORD_HASHER)),
    __param(2, (0, common_1.Inject)(event_publisher_port_1.EVENT_PUBLISHER)),
    __metadata("design:paramtypes", [Object, Object, Object])
], RegisterUserHandler);
//# sourceMappingURL=register-user.handler.js.map