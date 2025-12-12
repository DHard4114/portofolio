/**
 * @file lib/prisma.ts
 * @description Prisma Client singleton instance
 * @module Prisma
 * 
 * Creates and exports a singleton Prisma Client instance to prevent
 * multiple instances in development due to hot reloading.
 * Includes query logging in development mode for debugging.
 * 
 * @author Daffa Hardhan
 * @created 2025
 */

import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
