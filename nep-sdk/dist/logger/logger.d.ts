export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
/** Contextual fields attached to every log line (service, traceId, tenantId, ...). */
export type LogContext = Record<string, unknown>;
export interface LoggerOptions {
    /** Originating service name, e.g. "nep-identity". */
    service: string;
    /** Minimum level to emit. Defaults to "info". */
    level?: LogLevel;
    /** Base context merged into every log line. */
    baseContext?: LogContext;
}
export interface Logger {
    debug(message: string, context?: LogContext): void;
    info(message: string, context?: LogContext): void;
    warn(message: string, context?: LogContext): void;
    error(message: string, error?: unknown, context?: LogContext): void;
    /** Returns a new logger with additional bound context (e.g. per-request traceId). */
    child(context: LogContext): Logger;
}
/**
 * Creates a structured JSON logger. Emits one JSON object per line to stdout as
 * `{ timestamp, level, service, message, ...context }`, filters below the minimum
 * level, and normalizes Error objects. `child()` returns a logger with merged context.
 */
export declare function createLogger(options: LoggerOptions): Logger;
//# sourceMappingURL=logger.d.ts.map