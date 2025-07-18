import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"
import type { AllMaterial } from "../typings/Material";
import { useAuth } from "../context/authContext";

export const MaterialDetailPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [ materialData, setMaterialData ] = useState<AllMaterial | null>(null);

    const navigate = useNavigate();

    const deleteMaterial = async () => {
        try {
            if (materialData) {
                await axios.delete(`http://localhost:3000/material/${materialData.id}`, {
                    withCredentials: true
                })

                navigate("/material");
            }
        } catch(err) {
            throw new Error("Erreur lors de la suppression du Matériel")
        }
    }

    const editNavigation = () => {
        if (materialData) navigate(`/editMaterial/${materialData.id}`);
    }

    const fetchMaterial = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/material/${id}`);

            if (response.status === 200) setMaterialData(response.data.data);
        } catch(err) {
            throw new Error("Erreur lors de la récupération du Matériel");
        }
    }

    useEffect(() => {
        fetchMaterial()
    }, [])

    return <>
        <div>
            {
                materialData && <>
                    <div className="meterial_detail_info box">
                        <h2>{materialData.name}</h2>
                        <p>Fournie par <span className="bold"><Link className="material_link" to={`/company/${materialData.company.id}`}>{materialData.company.name}</Link></span></p>
                    </div>

                    {
                        user &&
                        <div className="furniture_detail_button_container box">
                            <button className="edit_button" type="button" onClick={editNavigation}>Editer</button>
                            <button className="delete_button" type="button" onClick={deleteMaterial}>Supprimer</button>
                        </div>
                    }
                </>
            }
        </div>
    </>
}