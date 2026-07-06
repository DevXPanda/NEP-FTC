// Typed error classes shared across NEP services. Map cleanly to HTTP status + machine-readable codes.

/**
 * Base class for all NEP domain errors.
 * Carries a stable machine-readable `code` and an HTTP `status` so gateways/filters
 * can translate consistently without string-matching messages.
 */
export abstract class DomainError extends Error {
  /** Stable, machine-readable error code, e.g. "IDENTITY.USER_NOT_FOUND". */
  abstract readonly code: string;
  /** Suggested HTTP status for API translation. */
  abstract readonly status: number;
  /** Optional structured context (never include secrets/PII). */
  readonly details?: Record<string, unknown>;

  constructor(message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = new.target.name;
    this.details = details;
    // Restore prototype chain when targeting ES5/ES2021 with transpilation.
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, new.target);
  }

  /** Serializable shape for logging and API error envelopes. */
  toJSON(): { name: string; code: string; status: number; message: string; details?: Record<string, unknown> } {
    // TODO: finalize the canonical NEP error envelope shape.
    return { name: this.name, code: this.code, status: this.status, message: this.message, details: this.details };
  }
}

/** Requested resource does not exist. */
export class NotFoundError extends DomainError {
  readonly code = 'COMMON.NOT_FOUND';
  readonly status = 404;
}

/** Input failed domain/schema validation. */
export class ValidationError extends DomainError {
  readonly code = 'COMMON.VALIDATION_FAILED';
  readonly status = 422;
}

/** Caller is not authenticated or the token/claims are insufficient. */
export class UnauthorizedError extends DomainError {
  readonly code = 'COMMON.UNAUTHORIZED';
  readonly status = 401;
}
