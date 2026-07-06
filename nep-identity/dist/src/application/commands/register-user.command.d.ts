import type { UserScopeType } from '../../domain/entities/user.entity';
export declare class RegisterUserCommand {
    readonly tenantId: string;
    readonly email: string;
    readonly password: string;
    readonly scopeType: UserScopeType;
    readonly scopeId: string | null;
    readonly roles: string[];
    constructor(tenantId: string, email: string, password: string, scopeType: UserScopeType, scopeId: string | null, roles?: string[]);
}
