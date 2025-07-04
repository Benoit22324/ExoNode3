import type { AllMaterial } from "../typings/Material";

export type MaterialViewProps = {
    material: AllMaterial
}

export const MaterialView = ({ material }: MaterialViewProps) => {
    return <>
        <div className="material_display">
            <h3>{material.name}</h3>
            <p>Fournis par: <span className="bold">{material.company.name}</span></p>
        </div>
    </>
} 