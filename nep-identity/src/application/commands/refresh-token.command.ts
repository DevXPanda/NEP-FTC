// Application command — input to the RefreshToken use case.
export class RefreshTokenCommand {
  constructor(
    public readonly tenantId: string,
    public readonly refreshToken: string,
  ) {}
}
