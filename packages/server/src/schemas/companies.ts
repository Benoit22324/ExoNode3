import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("text").notNull()
})