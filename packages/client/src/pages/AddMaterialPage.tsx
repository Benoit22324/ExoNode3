import { useEffect, useState } from "react"
import type { CompanyWithMaterials } from "../typings/Company";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import type { AllMaterial } from "../typings/Material";

export const AddMaterialPage = () => {
    const { id } = useParams();
    const [ onEdit, setOnEdit ] = useState<boolean>(false);
    const [ defaultMaterialData, setDefaultMaterialData ] = useState<AllMaterial | null>(null);
    const [ companies, setCompanies ] = useState<CompanyWithMaterials[] | null>(null);
    const [ success, setSuccess ] = useState<boolean>(false);
    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue,
        reset
    } = useForm();

    const navigate = useNavigate();

    const handleFormSubmit = async (data: any) => {
        setSuccess(false);

        try {
            const materialData = {
                name: data.name,
                companyId: data.company
            }

            if (!onEdit) {
                const response = await axios.post("http://localhost:3000/material", materialData, {
                    withCredentials: true
                })

                if (response.status === 201) {
                    setSuccess(true);
                    reset();
                }
            } else if (onEdit && defaultMaterialData) {
                const response = await axios.put(`http://localhost:3000/material/${defaultMaterialData.id}`, materialData, {
                    withCredentials: true
                })

                if (response.status === 201) navigate(`/material/${defaultMaterialData.id}`)
            }
        } catch(err) {
            throw new Error("Erreur lors de l'ajout du Matériel");
        }
    }

    const fetchCompanies = async () => {
        try {
            const response = await axios.get("http://localhost:3000/company");

            if (response.status === 200) setCompanies(response.data.data);
        } catch(err) {
            throw new Error("Erreur lors de la récupération des Compagnies");
        }
    }

    const setDefaultMaterial = async () => {
        setOnEdit(true);

        try {
            const response = await axios.get(`http://localhost:3000/material/${id}`);

            if (response.status === 200) {
                const material: AllMaterial = response.data.data;

                setValue("name", material.name);
                setValue("company", material.company.id);
                setDefaultMaterialData(material);
            }
        } catch(err) {
            throw new Error("Erreur lors de la récupération des Matériaux");
        }
    }

    useEffect(() => {
        fetchCompanies();

        if (id) {
            setDefaultMaterial();
        }
    }, [])

    return <>
        <div className="add_material_container">
            <h2>Formulaire d'ajout de matériel</h2>

            {
                success && <p className="success_message">Le matériel a été ajouté avec succès</p>
            }

            <form className="add_material_form" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="add_material_input_container">
                    <label>Nom du matériel:</label>

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="name"
                        defaultValue={""}
                        render={({field}) => <input
                            className="add_material_input"
                            {...field}
                        />}
                    />
                </div>

                {
                    errors.name && <p className="error_message">Veuillez saisir un nom</p>
                }

                <div className="add_material_input_container">
                    <label>Compagnie:</label>

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="company"
                        defaultValue={""}
                        render={({field}) => <select
                            className="add_material_input"
                            {...field}
                        >
                            <option value="">Sélectionner une Compagnie</option>
                            {
                                companies && companies.map(company => <option key={company.id} value={company.id}>{company.name}</option>)
                            }
                        </select>}
                    />
                </div>

                {
                    errors.campany && <p className="error_message">Veuillez sélectionner une Compagnie</p>
                }

                <button className="add_material_submit" type="submit">{ onEdit ? "Mettre à jour" : "Ajouter" }</button>
            </form>
        </div>
    </>
}