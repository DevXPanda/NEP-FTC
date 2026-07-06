"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    jwt: {
        secret: process.env.JWT_SECRET ?? '',
        refreshSecret: process.env.JWT_REFRESH_SECRET ?? '',
        accessTtlSec: parseInt(process.env.JWT_ACCESS_TTL_SEC ?? '900', 10),
        refreshTtlSec: parseInt(process.env.JWT_REFRESH_TTL_SEC ?? '2592000', 10),
    },
    database: { url: process.env.NEP_IDENTITY_DB_URL ?? '' },
    redis: { url: process.env.REDIS_URL ?? '' },
    rabbitmq: {
        url: process.env.RABBITMQ_URL ?? '',
        exchange: process.env.RABBITMQ_EXCHANGE ?? 'nep.events',
    },
});
//# sourceMappingURL=configuration.js.map