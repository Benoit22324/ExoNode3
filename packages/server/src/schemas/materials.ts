import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { companies } from "./";

export const materials = pgTable("materials", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull()
})