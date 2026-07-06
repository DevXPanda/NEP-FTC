import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { PrismaService } from '../prisma.service';
export declare class PrismaUserRepository implements IUserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(tenantId: string, id: string): Promise<User | null>;
    findByEmail(tenantId: string, email: string): Promise<User | null>;
    existsByEmail(tenantId: string, email: string): Promise<boolean>;
    save(user: User): Promise<void>;
    private toDomain;
}
