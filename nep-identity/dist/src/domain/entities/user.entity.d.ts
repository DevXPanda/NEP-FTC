export type UserStatus = 'active' | 'suspended' | 'deleted';
export type UserScopeType = 'global' | 'organization' | 'branch' | 'warehouse';
export interface UserScopedClaims {
    userId: string;
    tenantId: string;
    roles: string[];
    scopeType: UserScopeType;
    scopeId: string | null;
}
export interface UserProps {
    id: string;
    tenantId: string;
    email: string;
    passwordHash: string;
    roles: string[];
    scopeType: UserScopeType;
    scopeId: string | null;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare class User {
    private props;
    private constructor();
    static create(input: {
        tenantId: string;
        email: string;
        passwordHash: string;
        roles?: string[];
        scopeType: UserScopeType;
        scopeId?: string | null;
    }): User;
    static fromPersistence(props: UserProps): User;
    get id(): string;
    get tenantId(): string;
    get email(): string;
    get passwordHash(): string;
    get roles(): string[];
    get scopeType(): UserScopeType;
    get scopeId(): string | null;
    get status(): UserStatus;
    get createdAt(): Date;
    get updatedAt(): Date;
    isActive(): boolean;
    scopedClaims(): UserScopedClaims;
    changePassword(newPasswordHash: string): void;
    suspend(): void;
    toPrimitives(): UserProps;
}
