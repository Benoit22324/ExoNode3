import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { categories } from "../schemas";
import { NewCategory } from "../entities";

export const categoryModel = {
    getAll: () => {
        try {
            return db.select({
                id: categories.id,
                name: categories.name
            }).from(categories);
        } catch(err) {
            throw new Error("Les Catégories n'ont pas pu être récupérés");
        }
    },

    get: (id: string) => {
        try {
            return db.query.categories.findFirst({
                where: eq(categories.id, id),
                columns: {
                    id: true,
                    name: true
                }
            })
        } catch(err) {
            throw new Error("La Catégorie n'a pas pu être récupéré");
        }
    },

    create: (category: NewCategory) => {
        try {
            return db.insert(categories).values(category);
        } catch(err) {
            throw new Error("La Catégorie n'a pas pu être créer");
        }
    },

    update: (id: string, category: NewCategory) => {
        try {
            return db.update(categories).set(category).where(
                eq(categories.id, id)
            );
        } catch(err) {
            throw new Error("La Catégorie n'a pas pu être mis à jour");
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(categories).where(
                eq(categories.id, id)
            );
        } catch(err) {
            throw new Error("La Catégorie n'a pas pu être supprimé");
        }
    }
}