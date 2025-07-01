import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { NewFurnitureMaterial } from "../entities";
import { furnituresMaterials } from "../schemas";

export const furnitureMaterialModel = {
    getByFurniture: (furnitureId: string) => {
        try {
            return db.query.furnituresMaterials.findMany({
                where: eq(furnituresMaterials.furnitureId, furnitureId),
                columns: {
                    id: true,
                    quantity: true
                },
                with: {
                    material: {
                        columns: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
        } catch(err) {
            throw new Error("Les Matériaux du Meuble n'a pas pu être récupéré");
        }
    },

    create: (furnitureMaterial: NewFurnitureMaterial) => {
        try {
            return db.insert(furnituresMaterials).values(furnitureMaterial);
        } catch(err) {
            throw new Error("Le Matériel du Meuble n'a pas pu être créer");
        }
    },

    update: (id: string, furnitureMaterial: NewFurnitureMaterial) => {
        try {
            return db.update(furnituresMaterials).set(furnitureMaterial).where(
                eq(furnituresMaterials.id, id)
            );
        } catch(err) {
            throw new Error("Le Matériel du Meuble n'a pas pu être mis à jour");
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(furnituresMaterials).where(
                eq(furnituresMaterials.id, id)
            );
        } catch(err) {
            throw new Error("Le Matériel du Meuble n'a pas pu être supprimé");
        }
    }
}