import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { categories, users } from "./";

export const furnitures = pgTable("furnitures", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    categoryId: uuid("category_id").references(() => categories.id, { onUpdate: "cascade" }).notNull(),
    authorId: uuid("author_id").references(() => users.id, { onDelete: "cascade" }).notNull()
})