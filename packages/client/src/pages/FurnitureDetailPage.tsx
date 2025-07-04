import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import type { AllFurniture } from "../typings/Furniture";
import { Doughnut } from "react-chartjs-2";
import { useAuth } from "../context/authContext";

export const FurnitureDetailPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [ furnitureData, setFurnitureData ] = useState<AllFurniture | null>(null);
    const [ doughnutData, setDoughnutData ] = useState<any>(null);
    const navigate = useNavigate();

    const deleteFurniture = async () => {
        try {
            if (furnitureData) {
                await axios.delete(`http://localhost:3000/furniture/${furnitureData.id}`, {
                    withCredentials: true
                })

                navigate("/");
            }
        } catch(err) {
            throw new Error("Erreur lors de la suppression du meuble")
        }
    }

    const editNavigation = () => {
        if (furnitureData) navigate(`/editFurniture/${furnitureData.id}`);
    }

    const fetchFurniture = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/furniture/${id}`);

            if (response.status === 200) {
                setFurnitureData(response.data.data);

                const furniture: AllFurniture = response.data.data;

                if (furniture.furnituresMaterials.length > 0) {
                    const data = {
                        labels: furniture.furnituresMaterials.map(fmat => fmat.material.name),
                        datasets: [{
                            data: furniture.furnituresMaterials.map(fmat => fmat.quantity),
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(21, 255, 0)',
                                'rgb(255, 190, 39)',
                                'rgb(47, 224, 255)',
                                'rgb(237, 44, 255)',
                                'rgb(62, 0, 233)',
                                'rgb(252, 255, 47)',
                                'rgb(26, 255, 148)'
                            ],
                            hoverOffset: 4
                        }]
                    }

                    setDoughnutData(data);
                }
            }
        } catch(err) {
            throw new Error("Erreur lors de la récupération du meuble");
        }
    }

    useEffect(() => {
        fetchFurniture()
    }, [])

    return <>
        <div className="furniture_detail_container">
            {
                furnitureData && <>
                    <div>
                        <div className="furniture_detail_info box">
                            <h2>{furnitureData.name}</h2>
                            <p>Fait par <span className="bold">{furnitureData.user.username}</span></p>
                            <p>Dans la catégorie: <span className="bold">{furnitureData.category.name}</span></p>
                        </div>

                        {
                            user &&
                            <div className="furniture_detail_button_container box">
                                <button className="edit_button" type="button" onClick={editNavigation}>Editer</button>
                                <button className="delete_button" type="button" onClick={deleteFurniture}>Supprimer</button>
                            </div>
                        }
                    </div>

                    {
                        doughnutData &&
                        <div className="doughnut_container">
                            <h2>Quantité de matériel utilisé:</h2>

                            <div className="material_doughnut">
                                <Doughnut data={doughnutData} options={{ maintainAspectRatio: true }} />
                            </div>
                        </div>
                    }
                </>
            }
        </div>
    </>
}