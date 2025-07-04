import type { Material } from "./Material"

export interface Company {
    id: string,
    name: string
}

export interface CompanyWithMaterials {
    id: string,
    name: string,
    materials: Material[]
}