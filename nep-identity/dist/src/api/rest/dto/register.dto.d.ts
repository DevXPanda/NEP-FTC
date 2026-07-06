declare const SCOPE_TYPES: readonly ["global", "organization", "branch", "warehouse"];
export declare class RegisterDto {
    email: string;
    password: string;
    scopeType: (typeof SCOPE_TYPES)[number];
    scopeId?: string;
    roles?: string[];
}
export {};
