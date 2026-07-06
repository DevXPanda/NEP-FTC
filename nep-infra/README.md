# nep-infra

Shared local development infrastructure for **NEP** — PostgreSQL, Redis, RabbitMQ.

## Start / stop

```bash
docker compose -f nep-infra/docker-compose.yml up -d      # start
docker compose -f nep-infra/docker-compose.yml ps         # status/health
docker compose -f nep-infra/docker-compose.yml down        # stop (keep data)
docker compose -f nep-infra/docker-compose.yml down -v     # stop + wipe volumes
```

## Endpoints & credentials (local only)

| Service    | URL / DSN                                                        | User / Pass          |
|------------|-----------------------------------------------------------------|----------------------|
| PostgreSQL | `postgresql://nep:nep_password@localhost:5432/nep`              | `nep` / `nep_password` |
| Redis      | `redis://localhost:6379`                                        | —                    |
| RabbitMQ   | AMQP `amqp://nep:nep_password@localhost:5672`                   | `nep` / `nep_password` |
| RabbitMQ UI| http://localhost:15672                                          | `nep` / `nep_password` |

The `identity` schema is created automatically on first start by
`postgres/init/01-schemas.sql`.
