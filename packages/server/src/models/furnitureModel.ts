import { eq } from "drizzle-orm";
import { db } from "../config/pool"
import { furnitures } from "../schemas"
import { NewFurniture } from "../entities";

export const furnitureModel = {
    getAll: () => {
        try {
            return db.query.furnitures.findMany({
                columns: {
                    id: true,
                    name: true
                },
                with: {
                    category: {
                        columns: {
                            id: true,
                            name: true
                        }
                    },
                    user: {
                        columns: {
                            id: true,
                            username: true
                        }
                    }
                }
            });
        } catch(err) {
            throw new Error("Les Meubles (Fournitures) n'ont pas pu être récupérés")
        }
    },

    get: (id: string) => {
        try {
            return db.query.furnitures.findFirst({
                where: eq(furnitures.id, id),
                columns: {
                    id: true,
                    name: true
                },
                with: {
                    category: {
                        columns: {
                            id: true,
                            name: true
                        }
                    },
                    user: {
                        columns: {
                            id: true,
                            username: true
                        }
                    },
                    furnituresMaterials: {
                        with: {
                            material: {
                                columns: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
        } catch(err) {
            throw new Error("Le Meuble (Fourniture) n'a pas pu être récupéré");
        }
    },

    create: (furniture: NewFurniture) => {
        try {
            return db.insert(furnitures).values(furniture);
        } catch(err) {
            throw new Error("Le Meuble (Furniture) n'a pas pu être créer");
        }
    },

    update: (id: string, furniture: NewFurniture) => {
        try {
            return db.update(furnitures).set(furniture).where(
                eq(furnitures.id, id)
            );
        } catch(err) {
            throw new Error("Le Meuble (Furniture) n'a pas pu être mis à jour");
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(furnitures).where(
                eq(furnitures.id, id)
            );
        } catch(err) {
            throw new Error("Le Meuble (Furniture) n'a pas pu être supprimé");
        }
    }
}