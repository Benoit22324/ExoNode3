import { useNavigate, useParams } from "react-router"
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useEffect, useState } from "react";
import type { CompanyWithMaterials } from "../typings/Company";

export const CompanyDetailPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [ companyData, setCompanyData ] = useState<CompanyWithMaterials | null>(null);

    const navigate = useNavigate();

    const deleteCompany = async () => {
        try {
            if (companyData) {
                await axios.delete(`http://localhost:3000/company/${id}`, {
                    withCredentials: true
                });

                navigate("/");
            }
        } catch(err) {
            throw new Error("Erreur lors de la suppression de la Compagnie")
        }
    }

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
                                if (index === companyData.materials.length - 2) return <span key={material.id} className="bold">{material.name} et </span>
                                if (index === companyData.materials.length - 1) return <span key={material.id} className="bold">{material.name}.</span>
                                return <span key={material.id} className="bold">{material.name}, </span>
                            })
                        }
                    </p>

                    {
                        user &&
                        <div className="furniture_detail_button_container">
                            <button className="edit_button" type="button">Editer</button>
                            <button className="delete_button" type="button" onClick={deleteCompany}>Supprimer</button>
                        </div>
                    }
                </>
            }
        </div>
    </>
}