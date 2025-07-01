import argon2 from "argon2";
import { categoryModel, companyModel, materialModel } from "../models";
import { userModel } from "../models/userModel";

const defaultCategories = [
    {
        name: "Armoire"
    },
    {
        name: "Étagère"
    }
];

const defaultCompanies = [
    {
        name: "BBois"
    },
    {
        name: "MetaLo"
    },
    {
        name: "pPlastique"
    }
];

const defaultMaterials = [
    {
        name: "frêne",
        company: "BBois"
    },
    {
        name: "chêne",
        company: "BBois"
    },
    {
        name: "noyer",
        company: "BBois"
    },
    {
        name: "acier",
        company: "MetaLo"
    },
    {
        name: "inox",
        company: "MetaLo"
    },
    {
        name: "aluminium",
        company: "MetaLo"
    },
    {
        name: "plastique",
        company: "pPlastique"
    }
];

const defaultUsers = [
    {
        username: "Master Mind",
        email: "artmin@gmail.com",
        password: "Artmin123$"
    }
]

async function defaultData() {
    console.log("Ajout des données...");

    defaultCategories.forEach(async (category) => await categoryModel.create(category));

    defaultCompanies.map(async (company) => await companyModel.create(company));

    defaultUsers.forEach(async (user) => {
        const hashPass = await argon2.hash(user.password);
        await userModel.create({...user, password: hashPass});
    });
    
    setTimeout(async () => {
        const companiesData = await companyModel.getAll();

        defaultMaterials.forEach(async (material) => {
            const company = companiesData.find(company => company.name === material.company);

            if (company) {
                await materialModel.create({name: material.name, companyId: company.id});
            }
        })

        console.log("Données ajoutés à la bdd !");
    }, 200);
}

defaultData();