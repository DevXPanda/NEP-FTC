// Config layer — fail-fast validation of required environment variables at boot.
const REQUIRED_ENV = [
  'NEP_IDENTITY_DB_URL',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'REDIS_URL',
  'RABBITMQ_URL',
] as const;

export function validateEnv(config: Record<string, unknown>): Record<string, unknown> {
  const missing = REQUIRED_ENV.filter((key) => !config[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  return config;
}
