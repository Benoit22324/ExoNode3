import { relations } from "drizzle-orm";
import { companies, materials } from "./";

export const companyRelations = relations(companies, ({ many }) => ({
    materials: many(materials)
}))

export const materialRelations = relations(materials, ({ one }) => ({
    company: one(companies, {
        fields: [ materials.companyId ],
        references: [ companies.id ]
    })
}))