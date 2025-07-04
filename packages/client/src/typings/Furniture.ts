import type { Category } from "./Category";
import type { FurnitureMaterial } from "./FurnitureMaterial";
import type { LightUser } from "./User";

export interface AllFurniture {
    id: string,
    name: string,
    category: Category,
    user: LightUser,
    furnituresMaterials: FurnitureMaterial[]
}