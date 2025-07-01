import { z } from "zod";

export const categoryCreationValidation = z.object({
    name: z.string().trim()
        .min(1, { message: "Le nom doit contenir au minimum 1 charactère" })
        .max(100, { message: "Le nom ne doit pas dépasser 100 charactères" })
})