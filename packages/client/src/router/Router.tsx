import { Route, Routes } from "react-router"
import { FurnituresPage } from "../pages/FurnituresPage"
import { GlobalLayout } from "../layout/GlobalLayout"

export const Router = () => {
    return <>
        <Routes>
            <Route element={<GlobalLayout />}>
                <Route path="/" element={<FurnituresPage />} />
            </Route>
        </Routes>
    </>
}