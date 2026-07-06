# @nep/sdk

Shared SDK for **NEP (NKTech Enterprise Platform)** microservices. Every service imports these
building blocks so cross-cutting concerns behave identically across the platform.

> Scaffold only — each module exposes a finished **interface** with a clear `TODO` implementation.

## Modules

| Import | Provides |
|--------|----------|
| `@nep/sdk/logger` | Structured JSON logger (`createLogger`, `Logger`, child contexts) |
| `@nep/sdk/errors` | Typed errors: `DomainError`, `NotFoundError`, `ValidationError`, `UnauthorizedError` |
| `@nep/sdk/auth` | JWT auth client — verify token, extract scoped claims (`userId`, `tenantId`, `roles`, `scopeType`, `scopeId`) |
| `@nep/sdk/messaging` | RabbitMQ publisher/consumer with retry + dead-letter support |
| `@nep/sdk/http` | Service-to-service HTTP client with retries + circuit breaker |
| `@nep/sdk/cache` | Redis cache client wrapper (typed get/set, TTL, read-through) |

Everything is also re-exported from the package root:

```ts
import { createLogger, UnauthorizedError, createJwtAuthClient } from '@nep/sdk';
```

## Install (internal registry)

```bash
npm install @nep/sdk
```

Optional peer dependencies are pulled in only by the services that use them:
`jsonwebtoken` (auth), `amqplib` (messaging), `ioredis` (cache).

## Build & publish

```bash
npm run build          # tsc -> dist/ (JS + .d.ts)
npm publish            # runs prepublishOnly (clean + build); publishes dist only
```

## Layout

```
src/
  logger/    # createLogger, Logger
  errors/    # DomainError + NotFoundError / ValidationError / UnauthorizedError
  auth/      # createJwtAuthClient, ScopedClaims
  messaging/ # createEventPublisher, createEventConsumer (retry + DLQ)
  http/      # createHttpClient (retry + circuit breaker)
  cache/     # createCacheClient (Redis)
  index.ts   # barrel export
```
