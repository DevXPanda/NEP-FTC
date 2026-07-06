"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserCommand = void 0;
class RegisterUserCommand {
    constructor(tenantId, email, password, scopeType, scopeId, roles = []) {
        this.tenantId = tenantId;
        this.email = email;
        this.password = password;
        this.scopeType = scopeType;
        this.scopeId = scopeId;
        this.roles = roles;
    }
}
exports.RegisterUserCommand = RegisterUserCommand;
//# sourceMappingURL=register-user.command.js.map