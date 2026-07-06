// Structured JSON logger wrapper. Emits one JSON object per line for ingestion by the platform log pipeline.

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

const LEVEL_WEIGHT: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

/** Normalizes an unknown thrown value into a serializable shape. */
function normalizeError(error: unknown): Record<string, unknown> | undefined {
  if (error === undefined || error === null) return undefined;
  if (error instanceof Error) {
    return { name: error.name, message: error.message, stack: error.stack };
  }
  return { value: String(error) };
}

/**
 * Creates a structured JSON logger. Emits one JSON object per line to stdout as
 * `{ timestamp, level, service, message, ...context }`, filters below the minimum
 * level, and normalizes Error objects. `child()` returns a logger with merged context.
 */
export function createLogger(options: LoggerOptions): Logger {
  const service = options.service;
  const minWeight = LEVEL_WEIGHT[options.level ?? 'info'];
  const baseContext = options.baseContext ?? {};

  function write(level: LogLevel, message: string, context?: LogContext, error?: unknown): void {
    if (LEVEL_WEIGHT[level] < minWeight) return;

    const line: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      level,
      service,
      message,
      ...baseContext,
      ...context,
    };
    const normalized = normalizeError(error);
    if (normalized) line.error = normalized;

    // Single line of JSON; errors go to stderr, everything else to stdout.
    const stream = level === 'error' ? process.stderr : process.stdout;
    stream.write(`${JSON.stringify(line)}\n`);
  }

  return {
    debug: (message, context) => write('debug', message, context),
    info: (message, context) => write('info', message, context),
    warn: (message, context) => write('warn', message, context),
    error: (message, error, context) => write('error', message, context, error),
    child(context: LogContext): Logger {
      return createLogger({
        service,
        level: options.level,
        baseContext: { ...baseContext, ...context },
      });
    },
  };
}
