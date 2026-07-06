export declare const USER_LOGGED_IN = "identity.user.logged_in";
export interface UserLoggedInPayload {
    userId: string;
    tenantId: string;
    occurredAt: string;
}
