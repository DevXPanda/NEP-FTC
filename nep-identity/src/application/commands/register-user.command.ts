// Application command — input to the RegisterUser use case (framework-agnostic).
import type { UserScopeType } from '../../domain/entities/user.entity';

export class RegisterUserCommand {
  constructor(
    public readonly tenantId: string,
    public readonly email: string,
    public readonly password: string,
    public readonly scopeType: UserScopeType,
    public readonly scopeId: string | null,
    public readonly roles: string[] = [],
  ) {}
}
