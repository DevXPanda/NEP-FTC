/**
 * Base class for all NEP domain errors.
 * Carries a stable machine-readable `code` and an HTTP `status` so gateways/filters
 * can translate consistently without string-matching messages.
 */
export declare abstract class DomainError extends Error {
    /** Stable, machine-readable error code, e.g. "IDENTITY.USER_NOT_FOUND". */
    abstract readonly code: string;
    /** Suggested HTTP status for API translation. */
    abstract readonly status: number;
    /** Optional structured context (never include secrets/PII). */
    readonly details?: Record<string, unknown>;
    constructor(message: string, details?: Record<string, unknown>);
    /** Serializable shape for logging and API error envelopes. */
    toJSON(): {
        name: string;
        code: string;
        status: number;
        message: string;
        details?: Record<string, unknown>;
    };
}
/** Requested resource does not exist. */
export declare class NotFoundError extends DomainError {
    readonly code = "COMMON.NOT_FOUND";
    readonly status = 404;
}
/** Input failed domain/schema validation. */
export declare class ValidationError extends DomainError {
    readonly code = "COMMON.VALIDATION_FAILED";
    readonly status = 422;
}
/** Caller is not authenticated or the token/claims are insufficient. */
export declare class UnauthorizedError extends DomainError {
    readonly code = "COMMON.UNAUTHORIZED";
    readonly status = 401;
}
//# sourceMappingURL=errors.d.ts.map