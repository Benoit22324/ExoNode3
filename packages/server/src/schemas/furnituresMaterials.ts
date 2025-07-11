import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { furnitures, materials } from "./";

export const furnituresMaterials = pgTable("furnitures_materials", {
    id: uuid("id").defaultRandom().primaryKey(),
    quantity: integer("quantity").notNull(),
    furnitureId: uuid("furniture_id").references(() => furnitures.id, { onDelete: "cascade" }).notNull(),
    materialId: uuid("material_id").references(() => materials.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull()
})