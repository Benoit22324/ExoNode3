import { z } from "zod";

export const companyCreationValidation = z.object({
    name: z.string().trim()
        .min(1, { message: "Le nom doit contenir au minimum 1 charactère" })
})