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
export declare class RefreshTokenEntity {
    private props;
    private constructor();
    static issue(input: {
        tenantId: string;
        userId: string;
        tokenHash: string;
        expiresAt: Date;
        sessionId?: string | null;
    }): RefreshTokenEntity;
    static fromPersistence(props: RefreshTokenProps): RefreshTokenEntity;
    get id(): string;
    get tenantId(): string;
    get userId(): string;
    get tokenHash(): string;
    isActive(now?: Date): boolean;
    revoke(): void;
    toPrimitives(): RefreshTokenProps;
}
