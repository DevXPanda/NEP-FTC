# NEP — NKTech Enterprise Platform

An enterprise ERP built as a **Hybrid Polyrepo**: each business capability lives in its own
repository, owns exactly one PostgreSQL schema, and integrates with the rest of the platform
through an API Gateway (sync) and RabbitMQ events (async).

## Repositories in this workspace

| Package | Type | Description | Status |
|---------|------|-------------|--------|
| [nep-identity](nep-identity/) | NestJS microservice | Identity & access management (auth, users, sessions, refresh tokens). Owns the `identity` schema. | Working starter |
| [nep-web](nep-web/) | Next.js 15 frontend | ERP web client (App Router, dynamic module menus, JWT middleware). | Scaffold |
| [nep-sdk](nep-sdk/) | Shared TS library (`@nep/sdk`) | Cross-cutting building blocks every service imports. | Partial — see below |
| [nep-infra](nep-infra/) | Docker Compose | Local Postgres + Redis + RabbitMQ for development. | Ready |

## Architecture principles

- **One repo = one business capability = one PostgreSQL schema.** No cross-schema database
  joins; capabilities integrate via REST contracts and domain events only.
- **Strict Clean Architecture** inside each service. Dependencies always point inward:
  `api → application → domain`. The `domain/` layer never imports from `infrastructure/` or
  `api/`; infrastructure implements interfaces (ports) defined in the domain.
- **Multi-tenancy** everywhere: every table carries `tenant_id`; every request is tenant-scoped.
- **Shared concerns live in `@nep/sdk`**, not copy-pasted per service.

```
┌────────────┐     REST (API Gateway)      ┌──────────────┐
│  nep-web   │ ──────────────────────────▶ │ nep-identity │
│ (Next.js)  │                              │  (NestJS)    │
└────────────┘                              └──────┬───────┘
                                                   │ events (RabbitMQ)
        every service imports  @nep/sdk            ▼
   (logger · errors · auth · messaging · http · cache)   nep.events exchange
```

## `@nep/sdk` module status

| Module | Export | Status |
|--------|--------|--------|
| logger | `createLogger` | ✅ Implemented (structured single-line JSON, level filter, child contexts) |
| errors | `DomainError`, `NotFoundError`, `ValidationError`, `UnauthorizedError` | ✅ Implemented |
| auth | `createJwtAuthClient` | ✅ `verify()` implemented (HS256; RS256/JWKS pending) |
| messaging | `createEventPublisher` | ✅ Implemented (durable topic exchange, confirms, retry+backoff) |
| messaging | `createEventConsumer` | ⏳ TODO stub (retry + dead-letter designed, not implemented) |
| http | `createHttpClient` | ⏳ TODO stub (retry + circuit breaker) |
| cache | `createCacheClient` | ⏳ TODO stub (Redis read-through) |

## Getting started (local)

Prerequisites: **Node 20+**, **npm**, and **Docker Desktop** (for the infra stack and integration tests).

```bash
# 1. Build and link the shared SDK
cd nep-sdk && npm install && npm run build && cd ..

# 2. Install the identity service (links @nep/sdk from ../nep-sdk)
cd nep-identity && npm install

# 3. Create the service .env (see nep-identity/.env.example)
cp .env.example .env      # then edit credentials as needed

# 4. Start shared infrastructure
cd .. && docker compose -f nep-infra/docker-compose.yml up -d

# 5. Migrate + seed + run the identity service
cd nep-identity
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed        # seeds a tenant + admin (see prisma/seed.ts)
npm run start:dev          # http://localhost:3000  (global prefix /api)
```

### Smoke-test the login endpoint

```bash
curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "X-Tenant-Id: 00000000-0000-0000-0000-000000000001" \
  -d '{"email":"admin@nep.local","password":"ChangeMe123!"}'
# → { "accessToken": "...", "refreshToken": "...", "tokenType": "Bearer", "expiresIn": 900 }
```

> On Windows PowerShell use `curl.exe` (plain `curl` is an alias for `Invoke-WebRequest`), or
> `Invoke-RestMethod`. RabbitMQ management UI: http://localhost:15672 (`nep` / `nep_password`).

## Testing

`nep-identity` ships an integration suite (Jest + Testcontainers) that runs the full auth flow
against **real** Postgres + RabbitMQ, asserts the JWT scoped claims, and verifies a
`UserLoggedIn` event lands on the exchange. It **skips gracefully when Docker is unreachable**.

```bash
cd nep-identity
npm run test:integration
```

## Infrastructure endpoints (local)

| Service | DSN / URL | Credentials |
|---------|-----------|-------------|
| PostgreSQL | `postgresql://nep:nep_password@localhost:5432/nep` | `nep` / `nep_password` |
| Redis | `redis://localhost:6379` | — |
| RabbitMQ (AMQP) | `amqp://nep:nep_password@localhost:5672` | `nep` / `nep_password` |
| RabbitMQ (UI) | http://localhost:15672 | `nep` / `nep_password` |

See [nep-infra/README.md](nep-infra/README.md) for start/stop/reset commands.

## Roadmap

- Implement remaining `@nep/sdk` modules (`createEventConsumer`, `createHttpClient`, `createCacheClient`).
- Commit the first Prisma migration for `nep-identity` and switch integration tests to `migrate deploy`.
- Build out `nep-web` (auth middleware, dynamic module registry menu, module pages).
- Add further capability services (inventory, sales, manufacturing) following the same template.
