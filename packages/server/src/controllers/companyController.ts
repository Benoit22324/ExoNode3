import { Request, Response } from "express";
import { companyModel } from "../models";
import { apiResponse } from "../utils/apiResponse";
import { z } from "zod";
import { companyCreationValidation } from "../validations";

export const getAllCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await companyModel.getAll();

        return apiResponse(res, companies, "Récupération avec succès");
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la récupération des Compagnies", 500);
    }
}

export const getCompany = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const company = await companyModel.get(id);
        if (!company) return apiResponse(res, null, "Compagnie Introuvable", 404);

        return apiResponse(res, company, "Récupération de la Compagnie avec succès");
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la récupération de la Compagnie", 500);
    }
}

export const addCompany = async (req: Request, res: Response) => {
    try {
        const { name } = companyCreationValidation.parse(req.body);

        await companyModel.create({ name });

        return apiResponse(res, null, "Création de la Compagnie avec succès");
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur lors de l'ajout de la Compagnie", 500);
    }
}

export const updateCompany = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = companyCreationValidation.parse(req.body);

        await companyModel.update(id, { name });

        return apiResponse(res, null, "Mise à jour de la Compagnie avec succès", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur lors de la mise à jour de la Compagnie", 500);
    }
}

export const deleteCompany = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await companyModel.delete(id);

        return apiResponse(res, null, "Suppression de la Compagnie avec succès", 201);
    } catch(err: any) {
        return apiResponse(res, null, "Erreur lors de la suppression de la Compagnie", 500);
    }
}