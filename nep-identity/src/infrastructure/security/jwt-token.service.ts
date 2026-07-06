// Infrastructure — JWT signing + opaque refresh-token minting, implementing ITokenService.
// Access tokens are verified elsewhere via @nep/sdk's JWT auth client (same secret/issuer).
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, randomBytes } from 'node:crypto';
import * as jwt from 'jsonwebtoken';
import type { UserScopedClaims } from '../../domain/entities/user.entity';
import {
  ITokenService,
  type IssuedAccessToken,
  type IssuedRefreshToken,
} from '../../application/ports/token.service.port';

export const JWT_ISSUER = 'nep-identity';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly config: ConfigService) {}

  async issueAccessToken(claims: UserScopedClaims): Promise<IssuedAccessToken> {
    const secret = this.config.getOrThrow<string>('jwt.secret');
    const expiresIn = this.config.get<number>('jwt.accessTtlSec', 900);

    // Claim names match @nep/sdk's ScopedClaims mapping (sub, tid, roles, scope_type, scope_id).
    const token = jwt.sign(
      {
        tid: claims.tenantId,
        roles: claims.roles,
        scope_type: claims.scopeType,
        scope_id: claims.scopeId,
      },
      secret,
      {
        subject: claims.userId,
        issuer: JWT_ISSUER,
        expiresIn,
      },
    );

    return { token, expiresIn };
  }

  issueRefreshToken(): IssuedRefreshToken {
    const token = randomBytes(48).toString('hex');
    const ttlSec = this.config.get<number>('jwt.refreshTtlSec', 60 * 60 * 24 * 30);
    return {
      token,
      hash: this.hashRefreshToken(token),
      expiresAt: new Date(Date.now() + ttlSec * 1000),
    };
  }

  hashRefreshToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
