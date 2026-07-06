// Application use case — LoginUser. Verifies credentials and issues an access + refresh token pair.
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UnauthorizedError, type EventPublisher } from '@nep/sdk';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository.interface';
import {
  IRefreshTokenRepository,
  REFRESH_TOKEN_REPOSITORY,
} from '../../domain/repositories/refresh-token.repository.interface';
import { RefreshTokenEntity } from '../../domain/entities/refresh-token.entity';
import {
  USER_LOGGED_IN,
  type UserLoggedInPayload,
} from '../../domain/events/user-logged-in.event';
import { IPasswordHasher, PASSWORD_HASHER } from '../ports/password-hasher.port';
import { ITokenService, TOKEN_SERVICE } from '../ports/token.service.port';
import { EVENT_PUBLISHER } from '../ports/event-publisher.port';
import { LoginUserCommand } from '../commands/login-user.command';
import { AuthTokensDto } from '../dto/auth-tokens.dto';

@Injectable()
export class LoginUserHandler {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY) private readonly refreshTokens: IRefreshTokenRepository,
    @Inject(PASSWORD_HASHER) private readonly hasher: IPasswordHasher,
    @Inject(TOKEN_SERVICE) private readonly tokens: ITokenService,
    @Inject(EVENT_PUBLISHER) private readonly events: EventPublisher,
  ) {}

  async execute(command: LoginUserCommand): Promise<AuthTokensDto> {
    const email = command.email.trim().toLowerCase();
    const user = await this.users.findByEmail(command.tenantId, email);

    // Uniform failure to avoid leaking whether the account exists.
    if (!user || !(await this.hasher.compare(command.password, user.passwordHash))) {
      throw new UnauthorizedError('Invalid credentials');
    }
    if (!user.isActive()) {
      throw new UnauthorizedError('Account is not active');
    }

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

    const payload: UserLoggedInPayload = {
      userId: user.id,
      tenantId: user.tenantId,
      occurredAt: new Date().toISOString(),
    };
    await this.events.publish<UserLoggedInPayload>({
      id: randomUUID(),
      type: USER_LOGGED_IN,
      version: 1,
      data: payload,
      occurredAt: payload.occurredAt,
    });

    return {
      accessToken: access.token,
      refreshToken: refresh.token,
      tokenType: 'Bearer',
      expiresIn: access.expiresIn,
    };
  }
}
