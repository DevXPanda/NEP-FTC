import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type ScopedClaims } from '@nep/sdk';
export interface AuthenticatedRequest {
    headers: Record<string, string | string[] | undefined>;
    user?: ScopedClaims;
}
export declare class JwtAuthGuard implements CanActivate {
    private readonly authClient;
    constructor(config: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
