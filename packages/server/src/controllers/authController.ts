import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { apiResponse } from "../utils/apiResponse";
import { authLoginValidation } from "../validations";
import { userModel } from "../models/userModel";
import argon2 from "argon2";
import { env } from "../config/env";

export const authLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = authLoginValidation.parse(req.body);

        const user = await userModel.findCredentials(email);
        if (!user) return apiResponse(res, null, "Identifiants Invalide", 400);

        const passCheck = await argon2.verify(user.password, password);
        if (!passCheck) return apiResponse(res, null, "Identifiants Invalide", 400);

        const accessToken = jwt.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: "10h" });
    
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: env.NODE_ENV === "prod"
        })

        return apiResponse(res, null, "Vous êtes connecté");
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur Serveur", 500);
    }
}

export const authLogout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("accessToken");

        return apiResponse(res, null, "Déconnexion réussi");
    } catch(err: any) {
        return apiResponse(res, null, "Erreur Serveur", 500);
    }
}