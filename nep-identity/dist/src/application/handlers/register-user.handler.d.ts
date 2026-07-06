import { type EventPublisher } from '@nep/sdk';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { IPasswordHasher } from '../ports/password-hasher.port';
import { RegisterUserCommand } from '../commands/register-user.command';
export declare class RegisterUserHandler {
    private readonly users;
    private readonly hasher;
    private readonly events;
    constructor(users: IUserRepository, hasher: IPasswordHasher, events: EventPublisher);
    execute(command: RegisterUserCommand): Promise<{
        userId: string;
    }>;
}
