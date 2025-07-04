import { Link } from "react-router"
import type { AllFurniture } from "../typings/Furniture"

export type FurnitureViewProps = {
    furniture: AllFurniture
}

export const FurnitureView = ({ furniture }: FurnitureViewProps) => {
    return <>
        <Link className="furniture_display" to={`/furniture/${furniture.id}`}>
            <h3>{furniture.name}</h3>
            <p>Catégorie: <span className="bold">{furniture.category.name}</span></p>
            <p>Fait par: <span className="bold">{furniture.user.username}</span></p>
        </Link>
    </>
}