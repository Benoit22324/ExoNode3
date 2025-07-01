import { z } from "zod";

export const FMatCreationValidation = z.object({
    quantity: z.number()
        .min(1, { message: "La quantité doit être au minimum de 1" }),
    furnitureId: z.string().trim(),
    materialId: z.string().trim()
})