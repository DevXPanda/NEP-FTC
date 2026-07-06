export declare const USER_REGISTERED = "identity.user.registered";
export interface UserRegisteredPayload {
    userId: string;
    tenantId: string;
    email: string;
    roles: string[];
    scopeType: string;
    scopeId: string | null;
    occurredAt: string;
}
