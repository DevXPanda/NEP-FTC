// Application use case — RegisterUser. Orchestrates domain + ports; contains no framework/IO details.
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ValidationError, type EventPublisher } from '@nep/sdk';
import { User } from '../../domain/entities/user.entity';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository.interface';
import {
  USER_REGISTERED,
  type UserRegisteredPayload,
} from '../../domain/events/user-registered.event';
import { IPasswordHasher, PASSWORD_HASHER } from '../ports/password-hasher.port';
import { EVENT_PUBLISHER } from '../ports/event-publisher.port';
import { RegisterUserCommand } from '../commands/register-user.command';

@Injectable()
export class RegisterUserHandler {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(PASSWORD_HASHER) private readonly hasher: IPasswordHasher,
    @Inject(EVENT_PUBLISHER) private readonly events: EventPublisher,
  ) {}

  async execute(command: RegisterUserCommand): Promise<{ userId: string }> {
    const email = command.email.trim().toLowerCase();

    if (await this.users.existsByEmail(command.tenantId, email)) {
      throw new ValidationError('Email is already registered', { email });
    }

    const passwordHash = await this.hasher.hash(command.password);
    const user = User.create({
      tenantId: command.tenantId,
      email,
      passwordHash,
      roles: command.roles,
      scopeType: command.scopeType,
      scopeId: command.scopeId,
    });

    await this.users.save(user);

    const payload: UserRegisteredPayload = {
      userId: user.id,
      tenantId: user.tenantId,
      email: user.email,
      roles: user.roles,
      scopeType: user.scopeType,
      scopeId: user.scopeId,
      occurredAt: new Date().toISOString(),
    };
    await this.events.publish<UserRegisteredPayload>({
      id: randomUUID(),
      type: USER_REGISTERED,
      version: 1,
      data: payload,
      occurredAt: payload.occurredAt,
    });

    return { userId: user.id };
  }
}
