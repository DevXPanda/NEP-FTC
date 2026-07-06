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
/**
 * Creates a RabbitMQ event publisher backed by a confirm channel.
 * Lazily connects on first publish, asserts a durable topic exchange, publishes
 * persistent JSON messages, and retries transient failures with exponential backoff.
 */
export declare function createEventPublisher(options: PublisherOptions): EventPublisher;
//# sourceMappingURL=event-publisher.d.ts.map