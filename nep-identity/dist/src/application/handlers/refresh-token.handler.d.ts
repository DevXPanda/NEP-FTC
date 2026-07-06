import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { IRefreshTokenRepository } from '../../domain/repositories/refresh-token.repository.interface';
import { ITokenService } from '../ports/token.service.port';
import { RefreshTokenCommand } from '../commands/refresh-token.command';
import { AuthTokensDto } from '../dto/auth-tokens.dto';
export declare class RefreshTokenHandler {
    private readonly users;
    private readonly refreshTokens;
    private readonly tokens;
    constructor(users: IUserRepository, refreshTokens: IRefreshTokenRepository, tokens: ITokenService);
    execute(command: RefreshTokenCommand): Promise<AuthTokensDto>;
}
