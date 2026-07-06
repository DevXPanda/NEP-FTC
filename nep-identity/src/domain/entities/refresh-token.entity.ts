// Domain entity — a persisted, hashed refresh token with lifecycle rules. Pure, no framework imports.
import { randomUUID } from 'node:crypto';
import { ValidationError } from '@nep/sdk';

export interface RefreshTokenProps {
  id: string;
  tenantId: string;
  userId: string;
  sessionId: string | null;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
}

export class RefreshTokenEntity {
  private constructor(private props: RefreshTokenProps) {}

  /** Issues a new refresh token record from an already-hashed token value. */
  static issue(input: {
    tenantId: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    sessionId?: string | null;
  }): RefreshTokenEntity {
    if (!input.tokenHash) {
      throw new ValidationError('tokenHash is required');
    }
    return new RefreshTokenEntity({
      id: randomUUID(),
      tenantId: input.tenantId,
      userId: input.userId,
      sessionId: input.sessionId ?? null,
      tokenHash: input.tokenHash,
      expiresAt: input.expiresAt,
      revokedAt: null,
      createdAt: new Date(),
    });
  }

  static fromPersistence(props: RefreshTokenProps): RefreshTokenEntity {
    return new RefreshTokenEntity({ ...props });
  }

  get id(): string {
    return this.props.id;
  }
  get tenantId(): string {
    return this.props.tenantId;
  }
  get userId(): string {
    return this.props.userId;
  }
  get tokenHash(): string {
    return this.props.tokenHash;
  }

  isActive(now: Date = new Date()): boolean {
    return this.props.revokedAt === null && this.props.expiresAt.getTime() > now.getTime();
  }

  revoke(): void {
    if (this.props.revokedAt === null) {
      this.props.revokedAt = new Date();
    }
  }

  toPrimitives(): RefreshTokenProps {
    return { ...this.props };
  }
}
