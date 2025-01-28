import { PrismaClient } from '@prisma/client';

// Add PrismaClient to the NodeJS global type so it persists in development mode
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a singleton instance of PrismaClient
const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Optional: Add logs for debugging
  });

// Prevent multiple instances of PrismaClient during development
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
