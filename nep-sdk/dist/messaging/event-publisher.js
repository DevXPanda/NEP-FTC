"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventPublisher = createEventPublisher;
// RabbitMQ event publisher wrapper — publishes domain events to a topic exchange with confirms + retry.
const amqp = __importStar(require("amqplib"));
const DEFAULT_RETRY = {
    maxAttempts: 5,
    backoffMs: 200,
    maxBackoffMs: 5000,
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/**
 * Creates a RabbitMQ event publisher backed by a confirm channel.
 * Lazily connects on first publish, asserts a durable topic exchange, publishes
 * persistent JSON messages, and retries transient failures with exponential backoff.
 */
function createEventPublisher(options) {
    const retry = { ...DEFAULT_RETRY, ...options.retry };
    let connection = null;
    let channel = null;
    let connecting = null;
    async function connect() {
        const conn = await amqp.connect(options.url);
        const ch = await conn.createConfirmChannel();
        await ch.assertExchange(options.exchange, 'topic', { durable: true });
        // Drop cached handles on error/close so the next publish reconnects.
        const reset = () => {
            connection = null;
            channel = null;
            connecting = null;
        };
        conn.on('error', reset);
        conn.on('close', reset);
        connection = conn;
        channel = ch;
        return ch;
    }
    async function getChannel() {
        if (channel)
            return channel;
        if (!connecting) {
            connecting = connect().catch((err) => {
                connecting = null;
                throw err;
            });
        }
        return connecting;
    }
    /** Publishes once on a confirm channel, resolving only after the broker acks. */
    async function publishOnce(event) {
        const ch = await getChannel();
        const body = Buffer.from(JSON.stringify(event));
        await new Promise((resolve, reject) => {
            ch.publish(options.exchange, event.type, body, {
                persistent: true,
                contentType: 'application/json',
                messageId: event.id,
                timestamp: Date.parse(event.occurredAt) || Date.now(),
                type: event.type,
                correlationId: event.correlationId,
                headers: { 'x-event-version': event.version },
            }, (err) => (err ? reject(err) : resolve()));
        });
    }
    return {
        async publish(event) {
            let lastErr;
            for (let attempt = 1; attempt <= retry.maxAttempts; attempt++) {
                try {
                    await publishOnce(event);
                    return;
                }
                catch (err) {
                    lastErr = err;
                    // Force a reconnect on the next attempt.
                    channel = null;
                    connection = null;
                    connecting = null;
                    if (attempt < retry.maxAttempts) {
                        const delay = Math.min(retry.backoffMs * 2 ** (attempt - 1), retry.maxBackoffMs);
                        await sleep(delay);
                    }
                }
            }
            throw lastErr instanceof Error
                ? lastErr
                : new Error(`Failed to publish event ${event.type} after ${retry.maxAttempts} attempts`);
        },
        async close() {
            try {
                await channel?.close();
                await connection?.close();
            }
            finally {
                channel = null;
                connection = null;
                connecting = null;
            }
        },
    };
}
//# sourceMappingURL=event-publisher.js.map