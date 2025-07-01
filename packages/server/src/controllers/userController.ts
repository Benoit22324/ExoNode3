import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { userModel } from "../models/userModel";
import { z } from "zod";
import { userCreationValidation } from "../validations";
import argon2 from "argon2";

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await userModel.get(id);
        if (!user) return apiResponse(res, null, "Utilisateur Introuvable", 404);

        return apiResponse(res, user, "Récupération avec succès");
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la récupération de l'Utilisateur", 500);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = userCreationValidation.parse(req.body);
        const { user } = res.locals;

        const hashPass = await argon2.hash(password);

        await userModel.update(user.id, {
            username,
            email,
            password: hashPass
        })

        return apiResponse(res, null, "Mise à jour de l'Utilisateur avec succès", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur lors de la mise à jour de l'Utilisateur", 500);
    }
}