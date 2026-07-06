import { type EventPublisher } from '@nep/sdk';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { IRefreshTokenRepository } from '../../domain/repositories/refresh-token.repository.interface';
import { IPasswordHasher } from '../ports/password-hasher.port';
import { ITokenService } from '../ports/token.service.port';
import { LoginUserCommand } from '../commands/login-user.command';
import { AuthTokensDto } from '../dto/auth-tokens.dto';
export declare class LoginUserHandler {
    private readonly users;
    private readonly refreshTokens;
    private readonly hasher;
    private readonly tokens;
    private readonly events;
    constructor(users: IUserRepository, refreshTokens: IRefreshTokenRepository, hasher: IPasswordHasher, tokens: ITokenService, events: EventPublisher);
    execute(command: LoginUserCommand): Promise<AuthTokensDto>;
}
