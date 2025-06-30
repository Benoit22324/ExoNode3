import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { companies, materials } from "../schemas";
import { NewMaterial } from "../entities";

export const materialModel = {
    getAll: () => {
        try {
            return db.query.materials.findMany({
                columns: {
                    id: true,
                    name: true
                },
                with: {
                    company: {
                        columns: {
                            id: true,
                            name: true
                        }
                    }
                }
            })
        } catch(err) {
            throw new Error("Les Matériaux n'ont pas pu être récupérés");
        }
    },

    get: (id: string) => {
        try {
            return db.query.materials.findFirst({
                where: eq(materials.id, id),
                columns: {
                    id: true,
                    name: true
                },
                with: {
                    company: {
                        columns: {
                            id: true,
                            name: true
                        }
                    }
                }
            })
        } catch(err) {
            throw new Error("Le matériel n'a pas pu être récupéré");
        }
    },

    create: (material: NewMaterial) => {
        try {
            return db.insert(materials).values(material);
        } catch(err) {
            throw new Error("Le matériel n'a pas pu être créer");
        }
    },

    update: (id: string, material: NewMaterial) => {
        try {
            return db.update(companies).set(material).where(
                eq(materials.id, id)
            );
        } catch(err) {
            throw new Error("Le matériel n'a pas pu être mis à jour");
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(companies).where(
                eq(materials.id, id)
            );
        } catch(err) {
            throw new Error("Le matériel n'a pas pu être supprimé");
        }
    }
}