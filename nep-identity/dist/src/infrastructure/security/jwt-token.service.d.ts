import { ConfigService } from '@nestjs/config';
import type { UserScopedClaims } from '../../domain/entities/user.entity';
import { ITokenService, type IssuedAccessToken, type IssuedRefreshToken } from '../../application/ports/token.service.port';
export declare const JWT_ISSUER = "nep-identity";
export declare class JwtTokenService implements ITokenService {
    private readonly config;
    constructor(config: ConfigService);
    issueAccessToken(claims: UserScopedClaims): Promise<IssuedAccessToken>;
    issueRefreshToken(): IssuedRefreshToken;
    hashRefreshToken(token: string): string;
}
