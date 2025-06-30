import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { furnituresMaterials } from "../schemas";

export type FurnitureMaterial = InferSelectModel<typeof furnituresMaterials>;

export type NewFurnitureMaterial = InferInsertModel<typeof furnituresMaterials>;