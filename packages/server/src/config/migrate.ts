import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

import { env } from "./env";

async function migration() {
    const pool = new Pool({
        connectionString: env.DATABASE_URL
    });
    const db: NodePgDatabase = drizzle(pool);

    await migrate(db, { migrationsFolder: "src/migrations" });

    console.log("Migration done !");

    await pool.end();
}