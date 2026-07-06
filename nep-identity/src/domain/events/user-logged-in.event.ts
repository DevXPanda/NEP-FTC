// Domain event — emitted when a user successfully authenticates. Pure data, no framework imports.
export const USER_LOGGED_IN = 'identity.user.logged_in';

export interface UserLoggedInPayload {
  userId: string;
  tenantId: string;
  occurredAt: string;
}
