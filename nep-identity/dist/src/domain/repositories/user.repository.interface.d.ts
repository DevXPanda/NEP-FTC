import { User } from '../entities/user.entity';
export declare const USER_REPOSITORY: unique symbol;
export interface IUserRepository {
    findById(tenantId: string, id: string): Promise<User | null>;
    findByEmail(tenantId: string, email: string): Promise<User | null>;
    save(user: User): Promise<void>;
    existsByEmail(tenantId: string, email: string): Promise<boolean>;
}
