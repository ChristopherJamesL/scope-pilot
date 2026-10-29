import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../../config/env.js";
import { PrismaClient } from "../../generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });

// One shared client for the whole app. Repositories import this; they never create their own.
export const prisma = new PrismaClient({ adapter });
