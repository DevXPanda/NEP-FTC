// Domain entity — pure enterprise rules for a User. No NestJS, no Prisma, no I/O.
// May depend on @nep/sdk (framework-agnostic value/error types only).
import { randomUUID } from 'node:crypto';
import { ValidationError } from '@nep/sdk';

export type UserStatus = 'active' | 'suspended' | 'deleted';
export type UserScopeType = 'global' | 'organization' | 'branch' | 'warehouse';

/** Scoped claims embedded in an access token for downstream authorization. */
export interface UserScopedClaims {
  userId: string;
  tenantId: string;
  roles: string[];
  scopeType: UserScopeType;
  scopeId: string | null;
}

export interface UserProps {
  id: string;
  tenantId: string;
  email: string;
  passwordHash: string;
  roles: string[];
  scopeType: UserScopeType;
  scopeId: string | null;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class User {
  private constructor(private props: UserProps) {}

  /** Registers a brand-new user. Generates identity and enforces invariants. */
  static create(input: {
    tenantId: string;
    email: string;
    passwordHash: string;
    roles?: string[];
    scopeType: UserScopeType;
    scopeId?: string | null;
  }): User {
    const email = input.email.trim().toLowerCase();

    if (!input.tenantId) {
      throw new ValidationError('tenantId is required');
    }
    if (!EMAIL_RE.test(email)) {
      throw new ValidationError('A valid email is required', { email: input.email });
    }
    if (!input.passwordHash) {
      throw new ValidationError('passwordHash is required');
    }
    if (input.scopeType !== 'global' && !input.scopeId) {
      throw new ValidationError('scopeId is required for non-global scope', {
        scopeType: input.scopeType,
      });
    }

    const now = new Date();
    return new User({
      id: randomUUID(),
      tenantId: input.tenantId,
      email,
      passwordHash: input.passwordHash,
      roles: input.roles ?? [],
      scopeType: input.scopeType,
      scopeId: input.scopeType === 'global' ? null : input.scopeId ?? null,
      status: 'active',
      createdAt: now,
      updatedAt: now,
    });
  }

  /** Rehydrates an entity from persisted state (no invariant re-validation). */
  static fromPersistence(props: UserProps): User {
    return new User({ ...props });
  }

  get id(): string {
    return this.props.id;
  }
  get tenantId(): string {
    return this.props.tenantId;
  }
  get email(): string {
    return this.props.email;
  }
  get passwordHash(): string {
    return this.props.passwordHash;
  }
  get roles(): string[] {
    return [...this.props.roles];
  }
  get scopeType(): UserScopeType {
    return this.props.scopeType;
  }
  get scopeId(): string | null {
    return this.props.scopeId;
  }
  get status(): UserStatus {
    return this.props.status;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  isActive(): boolean {
    return this.props.status === 'active';
  }

  /** The claim set to embed in an access token. */
  scopedClaims(): UserScopedClaims {
    return {
      userId: this.props.id,
      tenantId: this.props.tenantId,
      roles: [...this.props.roles],
      scopeType: this.props.scopeType,
      scopeId: this.props.scopeId,
    };
  }

  changePassword(newPasswordHash: string): void {
    if (!newPasswordHash) {
      throw new ValidationError('passwordHash is required');
    }
    this.props.passwordHash = newPasswordHash;
    this.props.updatedAt = new Date();
  }

  suspend(): void {
    this.props.status = 'suspended';
    this.props.updatedAt = new Date();
  }

  /** Snapshot of internal state for persistence mapping. */
  toPrimitives(): UserProps {
    return { ...this.props, roles: [...this.props.roles] };
  }
}
