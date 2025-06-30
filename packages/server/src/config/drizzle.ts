import { defineConfig } from "drizzle-kit";
import { env } from "./env";

export default defineConfig({
    dialect: "postgresql",
    out: "src/migrations",
    schema: "src/schemas/index.ts",
    dbCredentials: {
        url: env.DATABASE_URL
    },
    verbose: true,
    strict: true
})