import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react"
import { useAuth } from "../context/authContext";
import { Link } from "react-router";
import type { AllFurniture } from "../typings/Furniture";
import { FurnitureView } from "../components/FurnitureView";
import type { Category } from "../typings/Category";

export const FurnituresPage = () => {
    const { user } = useAuth();
    const [ furnituresData, setFurnituresData ] = useState<AllFurniture[] | null>(null);
    const [ categories, setCategories ] = useState<Category[] | null>(null);
    const [ selectedSort, setSelectedSort ] = useState<string>("All")

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        setSelectedSort(value);
    }

    const getSortedFurniture = (furnituresList: AllFurniture[]) => {
        const furnitures = furnituresList.map(furniture => {
            if (selectedSort === "All") return <FurnitureView key={furniture.id} furniture={furniture} />
            if (furniture.category.name === selectedSort) return <FurnitureView key={furniture.id} furniture={furniture} />
        }).filter(furniture => furniture !== undefined)

        return furnitures
    }

    const fetchFurnitures = async () => {
        try {
            const response = await axios.get("http://localhost:3000/furniture");

            if (response.status === 200) setFurnituresData(response.data.data);
        } catch(err) {
            throw new Error("Erreur lors de la récupération de la liste des meubles");
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:3000/category");

            if (response.status === 200) setCategories(response.data.data);
        } catch(err) {
            throw new Error("Erreur lors de la récupération des Catégories")
        }
    }

    useEffect(() => {
        fetchFurnitures();
        fetchCategories();
    }, [])

    return <>
        <div className={`${user && "user_authenticated"}`}>
            <h2>Liste des meubles disponibles:</h2>
            {
                user && <Link className="add_furniture_button" to="/addFurniture">Ajouter un Meuble</Link>
            }
        </div>
        <div className="furniture_sort_container box">
            <label>Trier par:</label>
            <select onChange={handleSortChange} className="furniture_sort_selector">
                <option value="All">Tout</option>
                {
                    categories && categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)
                }
            </select>
        </div>
        <div className="furnitures_container box">
            {
                furnituresData && furnituresData.length > 0 ? getSortedFurniture(furnituresData).length > 0 ?
                    getSortedFurniture(furnituresData)
                    : <p>Aucun meuble disponible dans cet Catégorie</p>
                : <p>Aucun meuble disponible</p>
            }
        </div>
    </>
}