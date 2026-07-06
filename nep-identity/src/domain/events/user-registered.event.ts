// Domain event — emitted when a new user is registered. Pure data, no framework imports.
export const USER_REGISTERED = 'identity.user.registered';

export interface UserRegisteredPayload {
  userId: string;
  tenantId: string;
  email: string;
  roles: string[];
  scopeType: string;
  scopeId: string | null;
  occurredAt: string;
}
