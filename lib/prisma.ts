import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'

import { withAccelerate } from '@prisma/extension-accelerate'
import ws from 'ws'
neonConfig.webSocketConstructor = ws

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// neonConfig.poolQueryViaFetch = true

// Type definitions
// declare global {
//   var prisma: PrismaClient | undefined
// }

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)

// TODO: fix the connection to persist
// const prisma =
//     global.prisma || new PrismaClient({ adapter }).$extends(withAccelerate())

const prisma = new PrismaClient({ adapter }).$extends(withAccelerate())
// if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma

// lib/prisma.ts
// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
