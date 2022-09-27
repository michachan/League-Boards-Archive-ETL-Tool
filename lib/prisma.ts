import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

const handleError = (event: Prisma.LogEvent) => {
  console.log(event);
};

prisma.$on('warn', handleError);
prisma.$on('info', handleError);
prisma.$on('error', handleError);

export default prisma;
