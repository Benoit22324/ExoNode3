import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useAuth } from "../context/authContext"
import { useEffect, useState } from "react";
import axios from "axios";
import type { AllFurniture } from "../typings/Furniture";

export type doughnutDataset = {
    materialName: string,
    quantity: number
}

export const ProfilePage = () => {
    const { user } = useAuth();
    const [ doughnutData, setDoughnutData ] = useState<any>(null);

    ChartJS.register(ArcElement, Tooltip, Legend);

    const date = new Date(user?.createdAt);

    const getCorrectDay = () => {
        switch(date.getDay()) {
            case 1:
                return "Lundi"
            case 2:
                return "Mardi"
            case 3:
                return "Mercredi"
            case 4:
                return "Jeudi"
            case 5:
                return "Vendredi"
            case 6:
                return "Samedi"
            case 7:
                return "Dimanchce"
        }
    }

    const getCorrectMonth = () => {
        switch(date.getMonth()) {
            case 0:
                return "Janvier"
            case 1:
                return "Février"
            case 2:
                return "Mars"
            case 3:
                return "Avril"
            case 4:
                return "Mai"
            case 5:
                return "Juin"
            case 6:
                return "Juillet"
            case 7:
                return "Août"
            case 8:
                return "Septembre"
            case 9:
                return "Octobre"
            case 10:
                return "Novembre"
            case 11:
                return "Décembre"
        }
    }

    const getFMat = (list: AllFurniture[]) => {
        const commonList = list.map((furniture: AllFurniture) => furniture.furnituresMaterials.length > 0 && furniture.furnituresMaterials).filter(fmatList => typeof fmatList !== "boolean");

        const commonData: doughnutDataset[] = [];

        commonList.map(list => list.map(fmat => {
            const newData = {
                materialName: fmat.material.name,
                quantity: fmat.quantity
            }

            commonData.push(newData)
        }))

        return commonData;
    }

    const groupInOne = (list: doughnutDataset[]) => {
        let newList: doughnutDataset[] = [];

        list.forEach(dataset => {
            const exist = newList.find(data => data.materialName === dataset.materialName);

            if (exist) {
                const newDataList = newList.map(data => {
                    if (data.materialName === dataset.materialName) {
                        const newData = {
                            ...dataset,
                            quantity: dataset.quantity + data.quantity
                        }

                        return newData;
                    }

                    return data
                })

                newList = newDataList;
            } else {
                const newData = {
                    materialName: dataset.materialName,
                    quantity: dataset.quantity
                }

                newList = [...newList, newData];
            }
        })

        return newList;
    }

    const fetchDoughnutData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/furniture");

            if (response.status === 200) {
                const sortedFMat = getFMat(response.data.data);

                if (sortedFMat.length > 0) {
                    const doughnutData = groupInOne(sortedFMat);

                    const data = {
                        labels: doughnutData.map(data => data.materialName),
                        datasets: [{
                            data: doughnutData.map(data => data.quantity),
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

                    setDoughnutData(data)
                }
            }
        } catch(err) {
            throw new Error("Erreur lors de la récupération de la liste des meubles");
        }
    }

    useEffect(() => {
        fetchDoughnutData()
    }, [])

    return <>
        <div className="profile_container">
            <div>
                <h2>Nom d'utilisateur: {user?.username}</h2>
                <p>Email: {user?.email}</p>
                <p>Date de création: {getCorrectDay()} {date.getDate()} {getCorrectMonth()} {date.getFullYear()}</p>
            </div>

            {
                doughnutData &&
                <div className="doughnut_container">
                    <h2>Quantité total de Matériels a utilisé sur les Meubles</h2>
                    <div className="material_doughnut">
                        <Doughnut data={doughnutData} options={{ maintainAspectRatio: true }} />
                    </div>
                </div>
            }
        </div>
    </>
}