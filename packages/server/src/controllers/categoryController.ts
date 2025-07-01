import { Request, Response } from "express";
import { categoryModel } from "../models";
import { apiResponse } from "../utils/apiResponse";
import { z } from "zod";
import { categoryCreationValidation } from "../validations";

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryModel.getAll();

        return apiResponse(res, categories, "Récupération avec succès");
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la récupération des Catégories", 500);
    }
}

export const getCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const category = await categoryModel.get(id);
        if (!category) return apiResponse(res, null, "Catégorie Introuvable", 404);

        return apiResponse(res, category, "Récupération avec succès");
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la récupération de la Catégorie", 500);
    }
}

export const addCategory = async (req: Request, res: Response) => {
    try {
        const { name } = categoryCreationValidation.parse(req.body);

        await categoryModel.create({ name });

        return apiResponse(res, null, "Création de la Catégorie avec succès", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur lors de l'ajout de la Catégorie", 500);
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = categoryCreationValidation.parse(req.body);

        await categoryModel.update(id, { name });

        return apiResponse(res, null, "Mise à jour de la Catégorie avec succès", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur lorss de la mise à jour de la Catégorie", 500);
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await categoryModel.delete(id);

        return apiResponse(res, null, "Suppression de la Catégorie avec succès", 201);
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la suppression de la Catégorie", 500);
    }
}