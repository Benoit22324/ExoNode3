import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { NewCompany } from "../entities";
import { companies } from "../schemas";

export const companyModel = {
    getAll: () => {
        try {
            return db.query.companies.findMany({
                columns: {
                    id: true,
                    name: true
                },
                with: {
                    materials: {
                        columns: {
                            id: true,
                            name: true
                        }
                    }
                }
            })
        } catch(err: any) {
            throw new Error("Les Compagnies n'ont pas pu être récupérés");
        }
    },

    get: (id: string) => {
        try {
            return db.query.companies.findFirst({
                where: eq(companies.id, id),
                columns: {
                    id: true,
                    name: true
                },
                with: {
                    materials: {
                        columns: {
                            id: true,
                            name: true
                        }
                    }
                }
            })
        } catch(err: any) {
            throw new Error("La Compagnie n'a pas pu être récupéré");
        }
    },

    create: (company: NewCompany) => {
        try {
            return db.insert(companies).values(company);
        } catch(err: any) {
            throw new Error("La Compagnie n'a pas pu être créer");
        }
    },

    update: (id: string, company: NewCompany) => {
        try {
            return db.update(companies).set(company).where(
                eq(companies.id, id)
            );
        } catch(err) {
            throw new Error("La Compagnie n'a pas pu être mis à jour");
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(companies).where(
                eq(companies.id, id)
            );
        } catch(err) {
            throw new Error("La Compagnie n'a pas pu être supprimé");
        }
    }
}