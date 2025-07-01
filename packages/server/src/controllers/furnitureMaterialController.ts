import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { furnitureMaterialModel } from "../models/furnitureMaterialModel";
import { z } from "zod";
import { FMatCreationValidation } from "../validations";

export const getFMatByFurniture = async (req: Request, res: Response) => {
    try {
        const { furnitureId } = req.params;

        const FMats = await furnitureMaterialModel.getByFurniture(furnitureId);
        if (!FMats) return apiResponse(res, null, "FMats Introuvable", 404);

        return apiResponse(res, FMats, "Récupération des FMats avec succès");
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la récupération des FMats", 500);
    }
}

export const addFMat = async (req: Request, res: Response) => {
    try {
        const { quantity, furnitureId, materialId } = FMatCreationValidation.parse(req.body);

        await furnitureMaterialModel.create({
            quantity,
            furnitureId,
            materialId
        });

        return apiResponse(res, null, "Création du FMat avec succès", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur lors de l'ajout du FMat", 500);
    }
}

export const updateFMat = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { quantity, furnitureId, materialId } = FMatCreationValidation.parse(req.body);

        await furnitureMaterialModel.update(id, {
            quantity,
            furnitureId,
            materialId
        });

        return apiResponse(res, null, "Mise à jour du FMat avec succès", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur lors de la mise à jour du FMat", 500);
    }
}

export const deleteFMat = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await furnitureMaterialModel.delete(id);

        return apiResponse(res, null, "Suppression du FMat avec succès", 201);
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la suppression du FMat", 500);
    }
}