// Domain port — repository interface for User. Implemented in infrastructure/, never here.
import { User } from '../entities/user.entity';

/** DI token for the User repository (kept in the domain so wiring depends inward). */
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  /** Finds a user within a tenant by id, or null. */
  findById(tenantId: string, id: string): Promise<User | null>;

  /** Finds a user within a tenant by (normalized) email, or null. */
  findByEmail(tenantId: string, email: string): Promise<User | null>;

  /** Inserts or updates the user (idempotent by id). */
  save(user: User): Promise<void>;

  /** True if a user with this email already exists in the tenant. */
  existsByEmail(tenantId: string, email: string): Promise<boolean>;
}
