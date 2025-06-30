import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { furnitures } from "../schemas";

export type Furniture = InferSelectModel<typeof furnitures>;

export type NewFurniture = InferInsertModel<typeof furnitures>;