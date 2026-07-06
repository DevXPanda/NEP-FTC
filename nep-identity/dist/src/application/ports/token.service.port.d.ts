import type { UserScopedClaims } from '../../domain/entities/user.entity';
export declare const TOKEN_SERVICE: unique symbol;
export interface IssuedAccessToken {
    token: string;
    expiresIn: number;
}
export interface IssuedRefreshToken {
    token: string;
    hash: string;
    expiresAt: Date;
}
export interface ITokenService {
    issueAccessToken(claims: UserScopedClaims): Promise<IssuedAccessToken>;
    issueRefreshToken(): IssuedRefreshToken;
    hashRefreshToken(token: string): string;
}
