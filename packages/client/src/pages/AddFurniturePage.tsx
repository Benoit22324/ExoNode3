import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form"
import type { Category } from "../typings/Category";
import { useAuth } from "../context/authContext";
import type { AllMaterial } from "../typings/Material";
import { useNavigate, useParams } from "react-router";
import type { AllFurniture } from "../typings/Furniture";

export type selectedMaterialsProps = {
    name: string,
    quantity: number
}

export const AddFurniturePage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [ onEdit, setOnEdit ] = useState<boolean>(false);
    const [ defaultFurnitureData, setDefaultFurnitureData ] = useState<AllFurniture | null>(null);
    const [ categories, setCategories ] = useState<Category[] | null>(null);
    const [ materials, setMaterials ] = useState<AllMaterial[] | null>(null);
    const [ selectedMaterials, setSelectedMaterials ] = useState<selectedMaterialsProps[]>([]);
    const [ selectedMaterialsError, setSelectedMaterialsError ] = useState<boolean>(false);
    const [ success, setSuccess ] = useState<boolean>(false);
    const {
        control,
        formState: { errors },
        reset,
        handleSubmit,
        setValue
    } = useForm();

    const navigate = useNavigate();

    const handleMaterialChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        setSelectedMaterialsError(false);

        const exist = selectedMaterials.find(material => material.name === value);

        if (exist) {
            const newSelectedMaterials = selectedMaterials.map(material => {
                if (material.name === value) return {...material, quantity: material.quantity + 1}

                return material
            })

            setSelectedMaterials(newSelectedMaterials);
        }
        else {
            setSelectedMaterials([...selectedMaterials, { name: value, quantity: 1 }]);
        }

        setValue("material", "");
    }

    const removeMaterial = (name: string) => {
        const newSelectedMaterials = selectedMaterials.filter(material => material.name !== name);

        setSelectedMaterials(newSelectedMaterials);
    }

    const handleFormSubmit = async (data: any) => {
        setSuccess(false);

        if (selectedMaterials.length <= 0) return setSelectedMaterialsError(true)

        try {
            if (user) {
                const furnitureData = {
                    name: data.name,
                    categoryId: data.category,
                    authorId: user.id
                }

                if (!onEdit) {
                    const response = await axios.post("http://localhost:3000/furniture", furnitureData, {
                        withCredentials: true
                    })

                    if (response.status === 201) {
                        const furnituresMaterialsData = selectedMaterials.map(selectedMat => {
                            const originalData = materials?.find(mat => mat.name === selectedMat.name);

                            return {
                                quantity: selectedMat.quantity,
                                furnitureId: response.data.data[0].id,
                                materialId: originalData?.id
                            }
                        })

                        const response2query = furnituresMaterialsData.map(async fmat => await axios.post("http://localhost:3000/fmat", fmat, {
                            withCredentials: true
                        }));

                        await Promise.all(response2query);

                        setSuccess(true);
                        setSelectedMaterials([]);
                        reset();
                    }
                } else if (onEdit && defaultFurnitureData) {
                    const response = await axios.put(`http://localhost:3000/furniture/${defaultFurnitureData.id}`, furnitureData, {
                        withCredentials: true
                    })

                    if (response.status === 201) {
                        const furnituresMaterialsData = selectedMaterials.map(selectedMat => {
                            const originalData = materials?.find(mat => mat.name === selectedMat.name);

                            return {
                                quantity: selectedMat.quantity,
                                furnitureId: defaultFurnitureData.id,
                                materialId: originalData?.id
                            }
                        })

                        const response2query = defaultFurnitureData.furnituresMaterials.map(async fmat => await axios.delete(`http://localhost:3000/fmat/${fmat.id}`, {
                            withCredentials: true
                        }));

                        await Promise.all(response2query);

                        const response3query = furnituresMaterialsData.map(async fmat => await axios.post("http://localhost:3000/fmat", fmat, {
                            withCredentials: true
                        }));

                        await Promise.all(response3query);

                        navigate(`/furniture/${defaultFurnitureData.id}`);
                    }
                }
            }
        } catch(err) {
            throw new Error("Erreur lors de l'ajout du Meuble");
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

    const fetchMaterials = async () => {
        try {
            const response = await axios.get("http://localhost:3000/material");

            if (response.status === 200) setMaterials(response.data.data);
        } catch(err) {
            throw new Error("Erreur lors de la récupération des Matériaux");
        }
    }

    const setDefaultFurniture = async () => {
        setOnEdit(true);

        try {
            const response = await axios.get(`http://localhost:3000/furniture/${id}`);

            if (response.status === 200) {
                const furniture: AllFurniture = response.data.data;
                const selectedMat = furniture.furnituresMaterials.map(fmat => ({
                    name: fmat.material.name,
                    quantity: fmat.quantity
                }))

                setValue("name", furniture.name);
                setValue("category", furniture.category.id);
                setSelectedMaterials(selectedMat);
                setDefaultFurnitureData(furniture);
            }
        } catch(err) {
            throw new Error("Erreur lors de la récupération du Meuble");
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchMaterials();

        if (id) {
            setDefaultFurniture();
        }
    }, [])

    return <>
        <div className="add_furniture_container">
            <h2 className="box">Formulaire d'ajout de meuble</h2>

            {
                success && <p className="success_message">Le meuble a été ajouté avec succès</p>
            }

            <form className="add_furniture_form box" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="add_furniture_input_container">
                    <label>Nom du mobilier:</label>

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="name"
                        defaultValue={""}
                        render={({ field }) => <input
                            className="add_furniture_input"
                            {...field}
                        />}
                    />
                </div>

                {
                    errors.name && <p className="error_message">Veuillez saisir un Nom</p>
                }

                <div className="add_furniture_input_container">
                    <label>Catégorie:</label>

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="category"
                        defaultValue={""}
                        render={({ field }) => <select
                            className="add_furniture_input"
                            {...field}
                        >
                            <option hidden>Sélectionner une Catégorie</option>
                            {
                                categories && categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
                            }
                        </select>}
                    />
                </div>

                {
                    errors.category && <p className="error_message">Veuillez saisir une Catégorie</p>
                }

                <div className="add_furniture_input_container">
                    <label>Matériel:</label>

                    <Controller
                        control={control}
                        name="material"
                        defaultValue={""}
                        render={({ field }) => <select
                            className="add_furniture_input"
                            {...field}
                            onChange={handleMaterialChange}
                        >
                            <option value="" hidden>Sélectionner un Matériel</option>
                            {
                                materials && materials.map(material => <option key={material.id} value={material.name}>{material.name}</option>)
                            }
                        </select>}
                    />
                </div>

                {
                    selectedMaterialsError && <p className="error_message">Vous devez choisir au moins 1 Matériel</p>
                }

                <div>
                    {
                        selectedMaterials.length > 0 && <>
                            <h3>Matériel Sélectionné:</h3>

                            {selectedMaterials.map(material => <p key={material.name} className="selected_material"><span className="selected_quantity">{material.quantity}</span> <span className="selected_name">{material.name}</span>
                                <button className="remove_selected" onClick={() => removeMaterial(material.name)} type="button">-</button>
                            </p>)}
                        </>
                    }
                </div>

                <button className="add_furniture_submit" type="submit">{ onEdit ? "Mettre à jour" : "Ajouter" }</button>
            </form>
        </div>
    </>
}