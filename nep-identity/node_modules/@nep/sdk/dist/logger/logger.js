"use strict";
// Structured JSON logger wrapper. Emits one JSON object per line for ingestion by the platform log pipeline.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = createLogger;
const LEVEL_WEIGHT = { debug: 10, info: 20, warn: 30, error: 40 };
/** Normalizes an unknown thrown value into a serializable shape. */
function normalizeError(error) {
    if (error === undefined || error === null)
        return undefined;
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
function createLogger(options) {
    const service = options.service;
    const minWeight = LEVEL_WEIGHT[options.level ?? 'info'];
    const baseContext = options.baseContext ?? {};
    function write(level, message, context, error) {
        if (LEVEL_WEIGHT[level] < minWeight)
            return;
        const line = {
            timestamp: new Date().toISOString(),
            level,
            service,
            message,
            ...baseContext,
            ...context,
        };
        const normalized = normalizeError(error);
        if (normalized)
            line.error = normalized;
        // Single line of JSON; errors go to stderr, everything else to stdout.
        const stream = level === 'error' ? process.stderr : process.stdout;
        stream.write(`${JSON.stringify(line)}\n`);
    }
    return {
        debug: (message, context) => write('debug', message, context),
        info: (message, context) => write('info', message, context),
        warn: (message, context) => write('warn', message, context),
        error: (message, error, context) => write('error', message, context, error),
        child(context) {
            return createLogger({
                service,
                level: options.level,
                baseContext: { ...baseContext, ...context },
            });
        },
    };
}
//# sourceMappingURL=logger.js.map