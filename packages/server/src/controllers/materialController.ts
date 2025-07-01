import { Request, Response } from "express";
import { materialModel } from "../models";
import { apiResponse } from "../utils/apiResponse";
import { z } from "zod";
import { materialCreationValidation } from "../validations";

export const getAllMaterials = async (req: Request, res: Response) => {
    try {
        const materials = await materialModel.getAll();

        return apiResponse(res, materials, "Récupération avec succès");
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la récupération des Matériaux", 500);
    }
}

export const getMaterial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const material = await materialModel.get(id);
        if (!material) return apiResponse(res, null, "Matériel Introuvable", 404);

        return apiResponse(res, material, "Récupération avec succès");
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la récupération du Matériel", 500);
    }
}

export const addMaterial = async (req: Request, res: Response) => {
    try {
        const { name, companyId } = materialCreationValidation.parse(req.body);

        await materialModel.create({
            name,
            companyId
        });

        return apiResponse(res, null, "Création du Matériel avec succès", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur lors de l'ajout du Matériel", 500);
    }
}

export const updateMaterial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, companyId } = materialCreationValidation.parse(req.body);

        await materialModel.update(id, {
            name,
            companyId
        });

        return apiResponse(res, null, "Mise à jour du Matériel avec succès", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur lors de la mise à jour du Matériel", 500);
    }
}

export const deleteMaterial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await materialModel.delete(id);

        return apiResponse(res, null, "Suppression du Matériel avec succès", 201);
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la suppression du Matériel", 500);
    }
}