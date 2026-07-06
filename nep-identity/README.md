# nep-identity

Identity & access-management microservice for **NEP (NKTech Enterprise Platform)**.

> Placeholder README — scaffold only. Business logic to be implemented.

## What this is

Part of NEP's **Hybrid Polyrepo** architecture:

- **ONE repo** = **ONE business capability** = **ONE PostgreSQL schema** (`identity`).
- Stack: NestJS + TypeScript · Prisma ORM · PostgreSQL · JWT auth · Redis cache · RabbitMQ events · Docker · Kubernetes.

## Clean Architecture — Dependency Rule

Dependencies always point **inward**. Nothing in an inner ring may know about an outer ring.

```
api → application → domain
              infrastructure ─┘ (implements domain interfaces)
```

- **`domain/`** — enterprise rules (aggregates, entities, value-objects, events, policies, repository *interfaces*). Pure TypeScript. **NEVER imports from `infrastructure/` or `api/`.**
- **`application/`** — use cases (commands, queries, handlers, DTOs). Depends only on `domain/`.
- **`infrastructure/`** — implements the interfaces declared in `domain/` (persistence, messaging, cache, http-clients). Depends inward.
- **`api/`** — delivery mechanism (REST controllers, event consumers, guards). Depends inward.

**Rule of thumb:** the domain layer must never import from `infrastructure/` or `api/`. Infrastructure implements interfaces defined in the domain.

## Layout

```
src/
  domain/          # entities, value objects, events, policies, repository interfaces
  application/     # commands, queries, handlers, dto
  infrastructure/  # persistence, messaging, cache, http-clients
  api/             # rest, events, guards
  config/
prisma/            # schema.prisma, migrations, seed
contracts/         # openapi.yaml, events.yaml
test/              # unit, integration, contract
docker/  k8s/  .github/workflows/
```

## Getting started

_TBD — do not run installs yet; this is scaffold-only._
