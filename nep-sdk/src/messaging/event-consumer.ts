// RabbitMQ event consumer wrapper — subscribes to events with bounded retry + dead-letter routing.

import type { EventEnvelope, RetryPolicy } from './event-publisher';

/** Handler for a single event. Throw to signal failure (triggers retry/DLQ per policy). */
export type EventHandler<T = unknown> = (event: EventEnvelope<T>) => Promise<void>;

export interface ConsumerOptions {
  url: string;
  /** Source topic exchange to bind against. */
  exchange: string;
  /** Durable queue name for this consumer group. */
  queue: string;
  /** Routing keys / patterns to bind, e.g. ["identity.user.*"]. */
  bindingKeys: string[];
  /** Max unacked messages in flight. */
  prefetch?: number;
  /** Retry policy before a message is dead-lettered. */
  retry?: RetryPolicy;
  /**
   * Dead-letter target. When retries are exhausted the message is routed here.
   * Defaults to `${queue}.dlx` / `${queue}.dlq` when omitted.
   */
  deadLetter?: { exchange: string; queue: string };
}

export interface EventConsumer {
  /** Registers a handler for a given event type/binding and begins consuming. */
  on<T>(eventType: string, handler: EventHandler<T>): this;
  /** Starts consuming (declares queue, DLX/DLQ, bindings, prefetch). */
  start(): Promise<void>;
  /** Stops consuming and closes the channel/connection. */
  stop(): Promise<void>;
}

/**
 * Creates a RabbitMQ event consumer.
 * TODO: implement — declare the queue with dead-letter arguments, bind keys,
 * ack on success, nack/republish with backoff up to maxAttempts, then dead-letter.
 */
export function createEventConsumer(_options: ConsumerOptions): EventConsumer {
  throw new Error('TODO: implement createEventConsumer');
}
