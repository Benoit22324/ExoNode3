import { Navigate, Route, Routes } from "react-router"
import { FurnituresPage } from "../pages/FurnituresPage"
import { GlobalLayout } from "../layout/GlobalLayout"
import { LoginPage } from "../pages/LoginPage"
import { useAuth } from "../context/authContext"
import { AddFurniturePage } from "../pages/AddFurniturePage"
import { MaterialPage } from "../pages/MaterialPage"
import { ProfilePage } from "../pages/ProfilePage"

export const Router = () => {
    const { user } = useAuth();

    return <>
        <Routes>
            <Route element={<GlobalLayout />}>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={<FurnituresPage />} />
                <Route path="/material" element={<MaterialPage />} />

                {
                    user && <>
                        <Route path="/addFurniture" element={<AddFurniturePage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </>
                }

                <Route path="*" element={<Navigate to={"/"} />} />
            </Route>
        </Routes>
    </>
}