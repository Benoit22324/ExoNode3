import { Navigate, Route, Routes } from "react-router"
import { FurnituresPage } from "../pages/FurnituresPage"
import { GlobalLayout } from "../layout/GlobalLayout"
import { LoginPage } from "../pages/LoginPage"
import { useAuth } from "../context/authContext"
import { AddFurniturePage } from "../pages/AddFurniturePage"
import { MaterialPage } from "../pages/MaterialPage"
import { ProfilePage } from "../pages/ProfilePage"
import { AddMaterialPage } from "../pages/AddMaterialPage"
import { FurnitureDetailPage } from "../pages/FurnitureDetailPage"
import { MaterialDetailPage } from "../pages/MaterialDetailPage"
import { CompanyDetailPage } from "../pages/CompanyDetailPage"

export const Router = () => {
    const { user } = useAuth();

    return <>
        <Routes>
            <Route element={<GlobalLayout />}>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={<FurnituresPage />} />
                <Route path="/material" element={<MaterialPage />} />

                <Route path="/furniture/:id" element={<FurnitureDetailPage />} />
                <Route path="/material/:id" element={<MaterialDetailPage />} />
                <Route path="/company/:id" element={<CompanyDetailPage />} />

                {
                    user && <>
                        <Route path="/addFurniture" element={<AddFurniturePage />} />
                        <Route path="/editFurniture/:id" element={<AddFurniturePage />} />
                        <Route path="/addMaterial" element={<AddMaterialPage />} />
                        <Route path="/editMaterial/:id" element={<AddMaterialPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </>
                }

                <Route path="*" element={<Navigate to={"/"} />} />
            </Route>
        </Routes>
    </>
}