import { Link, useLocation } from "react-router"
import { useAuth } from "../context/authContext"

export const Navbar = () => {
    const { user } = useAuth();
    const location = useLocation();

    return <>
        <nav>
            <Link className={`nav_link ${location.pathname === "/" && "selected_link"}`} to="/">Meubles</Link>
            <Link className={`nav_link ${location.pathname === "/material" && "selected_link"}`} to="/material">Matériels</Link>

            {
                user && <>
                    <Link className={`nav_link ${location.pathname === "/profile" && "selected_link"}`} to="/profile">Profile</Link>
                </>
            }
        </nav>
    </>
}