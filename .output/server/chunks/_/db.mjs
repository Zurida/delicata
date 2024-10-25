import { PrismaClient } from '@prisma/client';

var _a;
const prismaClientSingleton = () => {
  return new PrismaClient();
};
const globalForPrisma = globalThis;
const prisma = (_a = globalForPrisma.prisma) != null ? _a : prismaClientSingleton();

export { prisma as p };
//# sourceMappingURL=db.mjs.map
