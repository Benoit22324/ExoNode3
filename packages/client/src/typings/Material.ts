import type { Company } from "./Company";

export interface AllMaterial {
    id: string,
    name: string,
    company: Company
}

export interface Material {
    id: string,
    name: string
}