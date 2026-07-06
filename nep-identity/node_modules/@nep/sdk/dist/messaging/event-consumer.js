"use strict";
// RabbitMQ event consumer wrapper — subscribes to events with bounded retry + dead-letter routing.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventConsumer = createEventConsumer;
/**
 * Creates a RabbitMQ event consumer.
 * TODO: implement — declare the queue with dead-letter arguments, bind keys,
 * ack on success, nack/republish with backoff up to maxAttempts, then dead-letter.
 */
function createEventConsumer(_options) {
    throw new Error('TODO: implement createEventConsumer');
}
//# sourceMappingURL=event-consumer.js.map