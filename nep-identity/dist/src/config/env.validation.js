"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = validateEnv;
const REQUIRED_ENV = [
    'NEP_IDENTITY_DB_URL',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
    'REDIS_URL',
    'RABBITMQ_URL',
];
function validateEnv(config) {
    const missing = REQUIRED_ENV.filter((key) => !config[key]);
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
    return config;
}
//# sourceMappingURL=env.validation.js.map