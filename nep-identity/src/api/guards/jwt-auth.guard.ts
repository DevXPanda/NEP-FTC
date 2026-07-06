// API layer — guard that authenticates requests by verifying the JWT via @nep/sdk.
// On success it attaches the normalized ScopedClaims to request.user.
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createJwtAuthClient, type JwtAuthClient, type ScopedClaims } from '@nep/sdk';
import { JWT_ISSUER } from '../../infrastructure/security/jwt-token.service';

export interface AuthenticatedRequest {
  headers: Record<string, string | string[] | undefined>;
  user?: ScopedClaims;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly authClient: JwtAuthClient;

  constructor(config: ConfigService) {
    this.authClient = createJwtAuthClient({
      secret: config.getOrThrow<string>('jwt.secret'),
      issuer: JWT_ISSUER,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const header = request.headers['authorization'];
    const raw = Array.isArray(header) ? header[0] : header;

    if (!raw || !raw.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }

    try {
      request.user = await this.authClient.verify(raw.slice('Bearer '.length));
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
