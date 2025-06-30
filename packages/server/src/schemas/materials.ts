import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { companies } from "./";

export const materials = pgTable("materials", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull()
})