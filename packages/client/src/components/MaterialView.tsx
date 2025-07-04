import { Link } from "react-router";
import type { AllMaterial } from "../typings/Material";

export type MaterialViewProps = {
    material: AllMaterial
}

export const MaterialView = ({ material }: MaterialViewProps) => {
    return <>
        <div className="material_display">
            <h3><Link to={`/material/${material.id}`} className="material_link">{material.name}</Link></h3>
            <p>Fournis par: <span className="bold"><Link to={`/company/${material.company.id}`} className="material_link">{material.company.name}</Link></span></p>
        </div>
    </>
} 