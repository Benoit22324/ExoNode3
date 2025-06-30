import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

import { env } from "./env";
import * as schema from "../schemas";

export const pool = new Pool({
    connectionString: env.DATABASE_URL
});

export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });