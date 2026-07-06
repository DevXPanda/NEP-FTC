// RabbitMQ event publisher wrapper — publishes domain events to a topic exchange with confirms + retry.
import * as amqp from 'amqplib';

/** Envelope wrapping every event published on the NEP bus. */
export interface EventEnvelope<T = unknown> {
  /** Unique event id (used for idempotency/dedupe). */
  id: string;
  /** Routing key / event name, e.g. "identity.user.created". */
  type: string;
  /** Schema version of the payload. */
  version: number;
  /** Event payload. */
  data: T;
  /** ISO timestamp of occurrence. */
  occurredAt: string;
  /** Optional correlation/causation ids for tracing. */
  correlationId?: string;
  causationId?: string;
}

export interface PublisherOptions {
  url: string;
  /** Topic exchange events are published to. */
  exchange: string;
  /** Publisher-confirm + retry policy for transient broker failures. */
  retry?: RetryPolicy;
}

export interface RetryPolicy {
  maxAttempts: number;
  /** Base delay in ms for exponential backoff. */
  backoffMs: number;
  /** Max delay cap in ms. */
  maxBackoffMs?: number;
}

export interface EventPublisher {
  /** Publishes an event using its `type` as the routing key. Resolves after broker confirm. */
  publish<T>(event: EventEnvelope<T>): Promise<void>;
  /** Gracefully flushes in-flight confirms and closes the channel/connection. */
  close(): Promise<void>;
}

const DEFAULT_RETRY: Required<RetryPolicy> = {
  maxAttempts: 5,
  backoffMs: 200,
  maxBackoffMs: 5000,
};

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Creates a RabbitMQ event publisher backed by a confirm channel.
 * Lazily connects on first publish, asserts a durable topic exchange, publishes
 * persistent JSON messages, and retries transient failures with exponential backoff.
 */
export function createEventPublisher(options: PublisherOptions): EventPublisher {
  const retry: Required<RetryPolicy> = { ...DEFAULT_RETRY, ...options.retry };

  let connection: amqp.ChannelModel | null = null;
  let channel: amqp.ConfirmChannel | null = null;
  let connecting: Promise<amqp.ConfirmChannel> | null = null;

  async function connect(): Promise<amqp.ConfirmChannel> {
    const conn = await amqp.connect(options.url);
    const ch = await conn.createConfirmChannel();
    await ch.assertExchange(options.exchange, 'topic', { durable: true });

    // Drop cached handles on error/close so the next publish reconnects.
    const reset = (): void => {
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

  async function getChannel(): Promise<amqp.ConfirmChannel> {
    if (channel) return channel;
    if (!connecting) {
      connecting = connect().catch((err) => {
        connecting = null;
        throw err;
      });
    }
    return connecting;
  }

  /** Publishes once on a confirm channel, resolving only after the broker acks. */
  async function publishOnce<T>(event: EventEnvelope<T>): Promise<void> {
    const ch = await getChannel();
    const body = Buffer.from(JSON.stringify(event));
    await new Promise<void>((resolve, reject) => {
      ch.publish(
        options.exchange,
        event.type,
        body,
        {
          persistent: true,
          contentType: 'application/json',
          messageId: event.id,
          timestamp: Date.parse(event.occurredAt) || Date.now(),
          type: event.type,
          correlationId: event.correlationId,
          headers: { 'x-event-version': event.version },
        },
        (err) => (err ? reject(err) : resolve()),
      );
    });
  }

  return {
    async publish<T>(event: EventEnvelope<T>): Promise<void> {
      let lastErr: unknown;
      for (let attempt = 1; attempt <= retry.maxAttempts; attempt++) {
        try {
          await publishOnce(event);
          return;
        } catch (err) {
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

    async close(): Promise<void> {
      try {
        await channel?.close();
        await connection?.close();
      } finally {
        channel = null;
        connection = null;
        connecting = null;
      }
    },
  };
}
