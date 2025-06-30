import { relations } from "drizzle-orm";
import { categories, companies, furnitures, furnituresMaterials, materials, users } from "./";

export const companyRelations = relations(companies, ({ many }) => ({
    materials: many(materials)
}))

export const materialRelations = relations(materials, ({ one, many }) => ({
    company: one(companies, {
        fields: [ materials.companyId ],
        references: [ companies.id ]
    }),

    furnituresMaterials: many(furnituresMaterials)
}))

export const furnitureRelations = relations(furnitures, ({ one, many }) => ({
    user: one(users, {
        fields: [ furnitures.authorId ],
        references: [ users.id ]
    }),

    category: one(categories, {
        fields: [ furnitures.categoryId ],
        references: [ categories.id ]
    }),

    furnituresMaterials: many(furnituresMaterials)
}))

export const furnitureMaterialRelations = relations(furnituresMaterials, ({ one }) => ({
    material: one(materials, {
        fields: [ furnituresMaterials.materialId ],
        references: [ materials.id ]
    }),

    furniture: one(furnitures, {
        fields: [ furnituresMaterials.furnitureId ],
        references: [ furnitures.id ]
    })
}))

export const categoryRelations = relations(categories, ({ many }) => ({
    furnitures: many(furnitures)
}))

export const userRelations = relations(users, ({ many }) => ({
    furnitures: many(furnitures)
}))