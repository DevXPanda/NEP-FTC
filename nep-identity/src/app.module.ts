// Root module — wires api → application → domain and binds infrastructure implementations to domain interfaces.
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createEventPublisher, type EventPublisher } from '@nep/sdk';

import configuration from './config/configuration';
import { validateEnv } from './config/env.validation';

// api
import { AuthController } from './api/rest/auth.controller';
import { JwtAuthGuard } from './api/guards/jwt-auth.guard';

// application
import { RegisterUserHandler } from './application/handlers/register-user.handler';
import { LoginUserHandler } from './application/handlers/login-user.handler';
import { RefreshTokenHandler } from './application/handlers/refresh-token.handler';
import { PASSWORD_HASHER } from './application/ports/password-hasher.port';
import { TOKEN_SERVICE } from './application/ports/token.service.port';
import { EVENT_PUBLISHER } from './application/ports/event-publisher.port';

// domain ports
import { USER_REPOSITORY } from './domain/repositories/user.repository.interface';
import { REFRESH_TOKEN_REPOSITORY } from './domain/repositories/refresh-token.repository.interface';

// infrastructure
import { PrismaService } from './infrastructure/persistence/prisma.service';
import { PrismaUserRepository } from './infrastructure/persistence/repositories/user.repository';
import { PrismaRefreshTokenRepository } from './infrastructure/persistence/repositories/refresh-token.repository';
import { BcryptPasswordHasher } from './infrastructure/security/bcrypt-password-hasher';
import { JwtTokenService } from './infrastructure/security/jwt-token.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
    }),
  ],
  controllers: [AuthController],
  providers: [
    // Application use cases
    RegisterUserHandler,
    LoginUserHandler,
    RefreshTokenHandler,

    // Infrastructure lifecycle
    PrismaService,

    // Port -> adapter bindings (dependency inversion; wiring points inward)
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
    { provide: REFRESH_TOKEN_REPOSITORY, useClass: PrismaRefreshTokenRepository },
    { provide: PASSWORD_HASHER, useClass: BcryptPasswordHasher },
    { provide: TOKEN_SERVICE, useClass: JwtTokenService },

    // Shared @nep/sdk event publisher, configured from env
    {
      provide: EVENT_PUBLISHER,
      inject: [ConfigService],
      useFactory: (config: ConfigService): EventPublisher =>
        createEventPublisher({
          url: config.getOrThrow<string>('rabbitmq.url'),
          exchange: config.getOrThrow<string>('rabbitmq.exchange'),
          retry: { maxAttempts: 5, backoffMs: 200, maxBackoffMs: 5000 },
        }),
    },

    // Guards
    JwtAuthGuard,
  ],
})
export class AppModule {}
