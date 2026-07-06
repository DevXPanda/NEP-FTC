"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const tenantId = process.env.SEED_TENANT_ID ?? (0, node_crypto_1.randomUUID)();
    const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@nep.local';
    const password = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!';
    await prisma.user.upsert({
        where: { tenantId_email: { tenantId, email } },
        update: {},
        create: {
            id: (0, node_crypto_1.randomUUID)(),
            tenantId,
            email,
            passwordHash: await bcrypt.hash(password, 12),
            roles: ['admin'],
            scopeType: 'global',
            scopeId: null,
            status: 'active',
        },
    });
    console.log(`Seeded admin ${email} for tenant ${tenantId}`);
}
main()
    .catch((err) => {
    console.error(err);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map