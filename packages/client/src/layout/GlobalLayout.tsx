import { Outlet } from "react-router"
import { Navbar } from "../components/Navbar"
import { Header } from "../components/Header"
import { useAuth } from "../context/authContext"

export const GlobalLayout = () => {
    const { user } = useAuth();

    return <>
        <Header />
        <div className="global_container">
            <div className="nav_container">
                {
                    user ? <p className="nav_user">{user.username}</p> : <p className="nav_user">Guest</p>
                }
                <Navbar />
            </div>
            <div className="content_container">
                <Outlet />
            </div>
        </div>
    </>
}