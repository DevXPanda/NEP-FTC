// Application command — input to the LoginUser use case.
export class LoginUserCommand {
  constructor(
    public readonly tenantId: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}
