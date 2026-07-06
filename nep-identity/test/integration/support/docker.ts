// Test support — decides whether the integration suite can run (i.e. Docker/Testcontainers reachable).
// When Docker is not available we skip gracefully instead of failing, so CI without Docker stays green.
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { RabbitMQContainer, type StartedRabbitMQContainer } from '@testcontainers/rabbitmq';

export interface StartedInfra {
  postgres: StartedPostgreSqlContainer;
  rabbitmq: StartedRabbitMQContainer;
}

/**
 * Attempts to start the ephemeral Postgres + RabbitMQ containers.
 * Returns the started infra, or null if Docker is not reachable (caller should skip).
 */
export async function tryStartInfra(): Promise<StartedInfra | null> {
  try {
    const postgres = await new PostgreSqlContainer('postgres:16-alpine').start();
    const rabbitmq = await new RabbitMQContainer('rabbitmq:3.13-management-alpine').start();
    return { postgres, rabbitmq };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(
      '\n[integration] Docker/Testcontainers not reachable — skipping integration tests.\n' +
        `  reason: ${(err as Error).message}\n`,
    );
    return null;
  }
}
