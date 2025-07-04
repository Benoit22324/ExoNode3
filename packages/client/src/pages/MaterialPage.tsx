import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios"
import { useEffect, useState } from "react"
import type { AllMaterial } from "../typings/Material"
import { useAuth } from "../context/authContext"
import { Link } from "react-router"
import { MaterialView } from "../components/MaterialView"
import type { CompanyWithMaterials } from "../typings/Company";

export const MaterialPage = () => {
    const { user } = useAuth();
    const [ materialsData, setMaterialsData ] = useState<AllMaterial[] | null>(null);
    const [ companiesData, setCompaniesData ] = useState<CompanyWithMaterials[] | null>(null);

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: companiesData?.map(company => company.name),
        datasets: [{
            data: companiesData?.map(company => company.materials.length),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(21, 255, 0)',
                'rgb(255, 205, 86)',
                'rgb(47, 224, 255)',
                'rgb(237, 44, 255)'
            ],
            hoverOffset: 4
        }]
    }

    const fetchCompanies = async () => {
        try {
            const response = await axios.get("http://localhost:3000/company");

            if (response.status === 200) setCompaniesData(response.data.data);
        } catch(err) {
            throw new Error("Erreur lors de la récupération des Compagnies")
        }
    }

    const fetchMaterials = async () => {
        try {
            const response = await axios.get("http://localhost:3000/material");

            if (response.status === 200) setMaterialsData(response.data.data);
        } catch(err) {
            throw new Error("Erreur lors de la récupération des Matériaux")
        }
    }

    useEffect(() => {
        fetchMaterials()
        fetchCompanies()
    }, [])

    return <>
        <div className={`${user && "user_authenticated"}`}>
            <h2>Liste des matériaux disponibles:</h2>
            {
                user && <Link className="add_material_button" to="/addMaterial">Ajouter un Matériel</Link>
            }
        </div>
        <div className="materials_container">
            <div>
                {
                    materialsData ? materialsData.map(material => <MaterialView key={material.id} material={material} />)
                    : <p>Aucun matériel disponible</p>
                }
            </div>
            {
                materialsData && <div className="material_doughnut">
                    <Doughnut data={data} options={{ maintainAspectRatio: true }} />
                </div>
            }
        </div>
    </>
}