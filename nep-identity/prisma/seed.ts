// Infrastructure seed script — populates the nep-identity schema with a baseline tenant admin.
import { randomUUID } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const tenantId = process.env.SEED_TENANT_ID ?? randomUUID();
  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@nep.local';
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!';

  await prisma.user.upsert({
    where: { tenantId_email: { tenantId, email } },
    update: {},
    create: {
      id: randomUUID(),
      tenantId,
      email,
      passwordHash: await bcrypt.hash(password, 12),
      roles: ['admin'],
      scopeType: 'global',
      scopeId: null,
      status: 'active',
    },
  });

  // eslint-disable-next-line no-console
  console.log(`Seeded admin ${email} for tenant ${tenantId}`);
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
