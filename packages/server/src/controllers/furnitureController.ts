import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { furnitureModel } from "../models";
import { z } from "zod";
import { furnitureCreationValidation, furnitureUpdateValidation } from "../validations";

export const getAllFurnitures = async (req: Request, res: Response) => {
    try {
        const furnitures = await furnitureModel.getAll();

        return apiResponse(res, furnitures, "Récupération avec succès");
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la récupération des Meubles", 500);
    }
}

export const getFurniture = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const furniture = await furnitureModel.get(id);
        if (!furniture) return apiResponse(res, null, "Meuble Introuvable", 404);

        return apiResponse(res, furniture, "Récupération avec succès");
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la récupération du Meuble", 500);
    }
}

export const addFurniture = async (req: Request, res: Response) => {
    try {
        const { name, categoryId } = furnitureCreationValidation.parse(req.body);
        const { user } = res.locals;

        const furniture = await furnitureModel.create({
            name,
            categoryId,
            authorId: user.id
        });

        return apiResponse(res, furniture, "Création du Meuble avec succès", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur lors de l'ajout du Meuble", 500);
    }
}

export const updateFurniture = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, categoryId, authorId } = furnitureUpdateValidation.parse(req.body);

        await furnitureModel.update(id, {
            name,
            categoryId,
            authorId
        });

        return apiResponse(res, null, "Mise à jour du Meuble avec succès", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur lors de la mise à jour du Meuble", 500);
    }
}

export const deleteFurniture = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await furnitureModel.delete(id);

        return apiResponse(res, null, "Suppression du Meuble avec succès", 201);
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la suppression du Meuble", 500);
    }
}