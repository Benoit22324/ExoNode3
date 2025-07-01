import { z } from "zod";

export const userCreationValidation = z.object({
    username: z.string().trim()
        .min(1, { message: "La question doit faire au minimum 1 charactère" }),
    email: z.string().trim()
        .email({ message: "Email Invalide" }),
    password: z.string().trim()
        .min(8, { message: "Votre mot de passe doit faire au moins 8 charactères" })
        .regex(/[0-9]/, { message: "Votre mot de passe doit contenir au moins un chiffre" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Votre mot de passe doit contenir au moins un caractère spécial" })
})