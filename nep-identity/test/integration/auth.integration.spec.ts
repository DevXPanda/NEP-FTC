// Integration test — full auth flow against REAL Postgres + RabbitMQ (Testcontainers).
// Follows the NEP Development Bible testing standard: Jest + Testcontainers, no mocks for infra.
// Skips gracefully (does not fail) when Docker is unreachable so CI without Docker stays green.
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as amqp from 'amqplib';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';

import { AppModule } from '../../src/app.module';
import { DomainExceptionFilter } from '../../src/api/filters/domain-exception.filter';
import { tryStartInfra, type StartedInfra } from './support/docker';

const TENANT_ID = '00000000-0000-0000-0000-000000000001';
const ADMIN_EMAIL = 'admin@nep.local';
const ADMIN_PASSWORD = 'ChangeMe123!';
const JWT_SECRET = 'integration-access-secret';
const EXCHANGE = 'nep.events';

jest.setTimeout(180_000);

const withTimeout = <T>(p: Promise<T>, ms: number, label: string): Promise<T> =>
  Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`timed out waiting for ${label} after ${ms}ms`)), ms),
    ),
  ]);

describe('Auth flow (integration)', () => {
  let infra: StartedInfra | null = null;
  let app: INestApplication | undefined;
  let prisma: PrismaClient | undefined;
  let dbUrl = '';
  let amqpUrl = '';

  // Guard used by every test so we report "skipped" cleanly when Docker is absent.
  const runOrSkip = (fn: () => Promise<void>) => async (): Promise<void> => {
    if (!infra) {
      // eslint-disable-next-line no-console
      console.warn('[integration] skipped: Docker not available');
      return;
    }
    await fn();
  };

  beforeAll(async () => {
    infra = await tryStartInfra();
    if (!infra) return;

    dbUrl = `${infra.postgres.getConnectionUri()}?schema=identity`;
    amqpUrl = infra.rabbitmq.getAmqpUrl();

    // Point the app (and the Prisma CLI) at the ephemeral containers.
    process.env.NEP_IDENTITY_DB_URL = dbUrl;
    process.env.JWT_SECRET = JWT_SECRET;
    process.env.JWT_REFRESH_SECRET = 'integration-refresh-secret';
    process.env.JWT_ACCESS_TTL_SEC = '900';
    process.env.JWT_REFRESH_TTL_SEC = '2592000';
    process.env.REDIS_URL = 'redis://localhost:6379';
    process.env.RABBITMQ_URL = amqpUrl;
    process.env.RABBITMQ_EXCHANGE = EXCHANGE;
    process.env.PORT = '0';

    // Create the identity schema + tables on the ephemeral DB via Prisma.
    execSync('npx prisma db push --skip-generate', { stdio: 'inherit', env: process.env });

    // Seed one tenant + super-admin (bcrypt cost matches BcryptPasswordHasher so login compares).
    prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } });
    await prisma.user.create({
      data: {
        id: randomUUID(),
        tenantId: TENANT_ID,
        email: ADMIN_EMAIL,
        passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12),
        roles: ['admin'],
        scopeType: 'global',
        scopeId: null,
        status: 'active',
      },
    });

    // Boot the app, mirroring the global pipes/filter/prefix configured in main.ts.
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    app.useGlobalFilters(new DomainExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
    await prisma?.$disconnect();
    await infra?.rabbitmq.stop();
    await infra?.postgres.stop();
  });

  it(
    'POST /api/auth/login → 200, token pair, correct scoped claims, publishes UserLoggedIn',
    runOrSkip(async () => {
      // Bind a temp queue to identity.user.* BEFORE logging in, so we catch the emitted event.
      const conn = await amqp.connect(amqpUrl);
      const ch = await conn.createChannel();
      await ch.assertExchange(EXCHANGE, 'topic', { durable: true });
      const q = await ch.assertQueue('', { exclusive: true });
      await ch.bindQueue(q.queue, EXCHANGE, 'identity.user.*');

      const loggedIn = new Promise<Record<string, unknown>>((resolve) => {
        void ch.consume(
          q.queue,
          (msg) => {
            if (!msg) return;
            const content = JSON.parse(msg.content.toString()) as Record<string, unknown>;
            ch.ack(msg);
            if (content.type === 'identity.user.logged_in') resolve(content);
          },
          { noAck: false },
        );
      });

      const res = await request(app!.getHttpServer())
        .post('/api/auth/login')
        .set('X-Tenant-Id', TENANT_ID)
        .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
        .expect(200);

      // Shape of the response.
      expect(res.body).toEqual(
        expect.objectContaining({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
          tokenType: 'Bearer',
          expiresIn: expect.any(Number),
        }),
      );

      // Decode the access token and assert the scoped claims.
      const decoded = jwt.verify(res.body.accessToken, JWT_SECRET, {
        issuer: 'nep-identity',
      }) as jwt.JwtPayload;
      expect(decoded.sub).toEqual(expect.any(String)); // userId
      expect(decoded.tid).toBe(TENANT_ID); // tenantId
      expect(decoded.roles).toEqual(['admin']);
      expect(decoded.scope_type).toBe('global'); // scopeType
      expect(decoded.scope_id).toBeNull(); // scopeId

      // Assert the UserLoggedIn event actually landed on the exchange.
      const event = await withTimeout(loggedIn, 15_000, 'UserLoggedIn event');
      expect(event.type).toBe('identity.user.logged_in');
      expect(event.data).toEqual(
        expect.objectContaining({ tenantId: TENANT_ID, userId: decoded.sub }),
      );

      await ch.close();
      await conn.close();
    }),
  );

  it(
    'POST /api/auth/refresh → 200, rotates to a new access + refresh token',
    runOrSkip(async () => {
      const login = await request(app!.getHttpServer())
        .post('/api/auth/login')
        .set('X-Tenant-Id', TENANT_ID)
        .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
        .expect(200);

      const oldRefresh = login.body.refreshToken as string;

      const res = await request(app!.getHttpServer())
        .post('/api/auth/refresh')
        .set('X-Tenant-Id', TENANT_ID)
        .send({ refreshToken: oldRefresh })
        .expect(200);

      expect(res.body).toEqual(
        expect.objectContaining({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
          tokenType: 'Bearer',
          expiresIn: expect.any(Number),
        }),
      );
      // Rotation: the refresh token must change.
      expect(res.body.refreshToken).not.toBe(oldRefresh);

      // The reused (now-revoked) refresh token must be rejected.
      await request(app!.getHttpServer())
        .post('/api/auth/refresh')
        .set('X-Tenant-Id', TENANT_ID)
        .send({ refreshToken: oldRefresh })
        .expect(401);
    }),
  );
});
