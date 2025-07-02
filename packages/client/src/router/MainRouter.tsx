import { Route, Routes } from "react-router"
import { FurniturePage } from "../pages/FurniturePage"

export const MainRouter = () => {
    return <>
        <Routes>
            <Route path="/" element={<FurniturePage />} />
        </Routes>
    </>
}