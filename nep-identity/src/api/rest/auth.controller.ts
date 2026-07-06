// API layer — REST controller. Translates HTTP <-> application commands. No business logic here.
import { BadRequestException, Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { RegisterUserHandler } from '../../application/handlers/register-user.handler';
import { LoginUserHandler } from '../../application/handlers/login-user.handler';
import { RefreshTokenHandler } from '../../application/handlers/refresh-token.handler';
import { RegisterUserCommand } from '../../application/commands/register-user.command';
import { LoginUserCommand } from '../../application/commands/login-user.command';
import { RefreshTokenCommand } from '../../application/commands/refresh-token.command';
import type { AuthTokensDto } from '../../application/dto/auth-tokens.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

const TENANT_HEADER = 'x-tenant-id';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserHandler,
    private readonly loginUser: LoginUserHandler,
    private readonly refreshTokenUseCase: RefreshTokenHandler,
  ) {}

  @Post('register')
  async register(
    @Headers(TENANT_HEADER) tenantId: string,
    @Body() dto: RegisterDto,
  ): Promise<{ userId: string }> {
    const command = new RegisterUserCommand(
      this.requireTenant(tenantId),
      dto.email,
      dto.password,
      dto.scopeType,
      dto.scopeId ?? null,
      dto.roles ?? [],
    );
    return this.registerUser.execute(command);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Headers(TENANT_HEADER) tenantId: string,
    @Body() dto: LoginDto,
  ): Promise<AuthTokensDto> {
    return this.loginUser.execute(
      new LoginUserCommand(this.requireTenant(tenantId), dto.email, dto.password),
    );
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Headers(TENANT_HEADER) tenantId: string,
    @Body() dto: RefreshDto,
  ): Promise<AuthTokensDto> {
    return this.refreshTokenUseCase.execute(
      new RefreshTokenCommand(this.requireTenant(tenantId), dto.refreshToken),
    );
  }

  private requireTenant(tenantId?: string): string {
    if (!tenantId) {
      throw new BadRequestException(`Missing required ${TENANT_HEADER} header`);
    }
    return tenantId;
  }
}
