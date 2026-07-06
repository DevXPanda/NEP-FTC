"use strict";
// Typed error classes shared across NEP services. Map cleanly to HTTP status + machine-readable codes.
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.ValidationError = exports.NotFoundError = exports.DomainError = void 0;
/**
 * Base class for all NEP domain errors.
 * Carries a stable machine-readable `code` and an HTTP `status` so gateways/filters
 * can translate consistently without string-matching messages.
 */
class DomainError extends Error {
    constructor(message, details) {
        super(message);
        this.name = new.target.name;
        this.details = details;
        // Restore prototype chain when targeting ES5/ES2021 with transpilation.
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace?.(this, new.target);
    }
    /** Serializable shape for logging and API error envelopes. */
    toJSON() {
        // TODO: finalize the canonical NEP error envelope shape.
        return { name: this.name, code: this.code, status: this.status, message: this.message, details: this.details };
    }
}
exports.DomainError = DomainError;
/** Requested resource does not exist. */
class NotFoundError extends DomainError {
    constructor() {
        super(...arguments);
        this.code = 'COMMON.NOT_FOUND';
        this.status = 404;
    }
}
exports.NotFoundError = NotFoundError;
/** Input failed domain/schema validation. */
class ValidationError extends DomainError {
    constructor() {
        super(...arguments);
        this.code = 'COMMON.VALIDATION_FAILED';
        this.status = 422;
    }
}
exports.ValidationError = ValidationError;
/** Caller is not authenticated or the token/claims are insufficient. */
class UnauthorizedError extends DomainError {
    constructor() {
        super(...arguments);
        this.code = 'COMMON.UNAUTHORIZED';
        this.status = 401;
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=errors.js.map