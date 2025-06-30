import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { users } from "../schemas";
import { NewUser } from "../entities";

export const userModel = {
    get: (id: string) => {
        try {
            return db.query.users.findFirst({
                where: eq(users.id, id),
                columns: {
                    id: true,
                    username: true,
                    email: true,
                    createdAt: true
                }
            });
        } catch(err) {
            throw new Error("L'utilisateur n'a pas pu être récupéré");
        }
    },

    findCredentials: (email: string) => {
        try {
            return db.query.users.findFirst({
                where: eq(users.email, email),
                columns: {
                    id: true,
                    email: true,
                    password: true
                }
            });
        } catch(err) {
            throw new Error("L'utilisateur n'a pas pu être récupéré");
        }
    },

    create: (user: NewUser) => {
        try {
            return db.insert(users).values(user).returning({
                id: users.id
            });
        } catch(err) {
            throw new Error("L'utilisateur n'a pas pu être créer");
        }
    },

    update: (id: string, user: NewUser) => {
        try {
            return db.update(users).set(user).where(
                eq(users.id, id)
            );
        } catch(err) {
            throw new Error("L'utilisateur n'a pas pu être mis à jour");
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(users).where(
                eq(users.id, id)
            );
        } catch(err) {
            throw new Error("L'utilisateur n'a pas pu être supprimé");
        }
    }
}