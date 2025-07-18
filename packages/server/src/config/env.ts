import dotenv from "dotenv";
import { EnvConfig } from "../types/EnvConfig";

dotenv.config();

export const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "3000"),
    DATABASE_URL: process.env.DATABASE_URL || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    NODE_ENV: process.env.NODE_ENV || ""
}