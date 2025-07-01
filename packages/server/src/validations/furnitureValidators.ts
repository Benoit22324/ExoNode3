import { z } from "zod";

export const furnitureCreationValidation = z.object({
    name: z.string().trim()
        .min(1, { message: "Le nom doit contenir au minimum 1 charactère" }),
    categoryId: z.string().trim()
})

export const furnitureUpdateValidation = z.object({
    name: z.string().trim()
        .min(1, { message: "Le nom doit contenir au minimum 1 charactère" }),
    categoryId: z.string().trim(),
    authorId: z.string().trim()
})