// Infrastructure — Prisma implementation of the domain IUserRepository port.
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import {
  User,
  type UserProps,
  type UserScopeType,
  type UserStatus,
} from '../../../domain/entities/user.entity';
import { PrismaService } from '../prisma.service';

// Minimal shape of a Prisma `users` row (avoids importing generated types into the mapper signature).
interface UserRow {
  id: string;
  tenantId: string;
  email: string;
  passwordHash: string;
  roles: string[];
  scopeType: string;
  scopeId: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(tenantId: string, id: string): Promise<User | null> {
    const row = await this.prisma.user.findFirst({ where: { id, tenantId } });
    return row ? this.toDomain(row) : null;
  }

  async findByEmail(tenantId: string, email: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({
      where: { tenantId_email: { tenantId, email: email.toLowerCase() } },
    });
    return row ? this.toDomain(row) : null;
  }

  async existsByEmail(tenantId: string, email: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { tenantId, email: email.toLowerCase() },
    });
    return count > 0;
  }

  async save(user: User): Promise<void> {
    const p = user.toPrimitives();
    await this.prisma.user.upsert({
      where: { id: p.id },
      create: {
        id: p.id,
        tenantId: p.tenantId,
        email: p.email,
        passwordHash: p.passwordHash,
        roles: p.roles,
        scopeType: p.scopeType,
        scopeId: p.scopeId,
        status: p.status,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      },
      update: {
        email: p.email,
        passwordHash: p.passwordHash,
        roles: p.roles,
        scopeType: p.scopeType,
        scopeId: p.scopeId,
        status: p.status,
        updatedAt: p.updatedAt,
      },
    });
  }

  private toDomain(row: UserRow): User {
    const props: UserProps = {
      id: row.id,
      tenantId: row.tenantId,
      email: row.email,
      passwordHash: row.passwordHash,
      roles: row.roles,
      scopeType: row.scopeType as UserScopeType,
      scopeId: row.scopeId,
      status: row.status as UserStatus,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
    return User.fromPersistence(props);
  }
}
