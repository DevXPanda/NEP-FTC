// Application use case — RefreshToken. Validates a refresh token and rotates it (old revoked, new issued).
import { Inject, Injectable } from '@nestjs/common';
import { UnauthorizedError } from '@nep/sdk';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository.interface';
import {
  IRefreshTokenRepository,
  REFRESH_TOKEN_REPOSITORY,
} from '../../domain/repositories/refresh-token.repository.interface';
import { RefreshTokenEntity } from '../../domain/entities/refresh-token.entity';
import { ITokenService, TOKEN_SERVICE } from '../ports/token.service.port';
import { RefreshTokenCommand } from '../commands/refresh-token.command';
import { AuthTokensDto } from '../dto/auth-tokens.dto';

@Injectable()
export class RefreshTokenHandler {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY) private readonly refreshTokens: IRefreshTokenRepository,
    @Inject(TOKEN_SERVICE) private readonly tokens: ITokenService,
  ) {}

  async execute(command: RefreshTokenCommand): Promise<AuthTokensDto> {
    const hash = this.tokens.hashRefreshToken(command.refreshToken);
    const stored = await this.refreshTokens.findByHash(command.tenantId, hash);

    if (!stored || !stored.isActive()) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    const user = await this.users.findById(command.tenantId, stored.userId);
    if (!user || !user.isActive()) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    // Rotate: revoke the presented token, then mint a fresh pair.
    stored.revoke();
    await this.refreshTokens.save(stored);

    const access = await this.tokens.issueAccessToken(user.scopedClaims());
    const refresh = this.tokens.issueRefreshToken();

    await this.refreshTokens.save(
      RefreshTokenEntity.issue({
        tenantId: user.tenantId,
        userId: user.id,
        tokenHash: refresh.hash,
        expiresAt: refresh.expiresAt,
      }),
    );

    return {
      accessToken: access.token,
      refreshToken: refresh.token,
      tokenType: 'Bearer',
      expiresIn: access.expiresIn,
    };
  }
}
