import { RegisterUserHandler } from '../../application/handlers/register-user.handler';
import { LoginUserHandler } from '../../application/handlers/login-user.handler';
import { RefreshTokenHandler } from '../../application/handlers/refresh-token.handler';
import type { AuthTokensDto } from '../../application/dto/auth-tokens.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
export declare class AuthController {
    private readonly registerUser;
    private readonly loginUser;
    private readonly refreshTokenUseCase;
    constructor(registerUser: RegisterUserHandler, loginUser: LoginUserHandler, refreshTokenUseCase: RefreshTokenHandler);
    register(tenantId: string, dto: RegisterDto): Promise<{
        userId: string;
    }>;
    login(tenantId: string, dto: LoginDto): Promise<AuthTokensDto>;
    refresh(tenantId: string, dto: RefreshDto): Promise<AuthTokensDto>;
    private requireTenant;
}
