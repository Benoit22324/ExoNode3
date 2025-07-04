import { Link, useParams } from "react-router"
import axios from "axios";
import { useEffect, useState } from "react";
import type { CompanyWithMaterials } from "../typings/Company";

export const CompanyDetailPage = () => {
    const { id } = useParams();
    const [ companyData, setCompanyData ] = useState<CompanyWithMaterials | null>(null);

    const fetchCompany = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/company/${id}`);

            if (response.status === 200) setCompanyData(response.data.data);
        } catch(err) {
            throw new Error("Erreur lors de la récupération de la Compagnie")
        }
    }

    useEffect(() => {
        fetchCompany()
    }, [])

    return <>
        <div>
            {
                companyData && <>
                    <h2>{companyData.name}</h2>
                    <p>Fournisseur de {
                            companyData.materials.map((material, index) => {
                                if (index === companyData.materials.length - 2) return <span key={material.id}><Link className="material_link bold" to={`/material/${material.id}`}>{material.name}</Link> et </span>
                                if (index === companyData.materials.length - 1) return <span key={material.id}><Link className="material_link bold" to={`/material/${material.id}`}>{material.name}</Link>.</span>
                                return <span key={material.id}><Link className="material_link bold" to={`/material/${material.id}`}>{material.name}</Link>, </span>
                            })
                        }
                    </p>
                </>
            }
        </div>
    </>
}