import { Link } from "react-router"
import { useAuth } from "../context/authContext"

export const Navbar = () => {
    const { user } = useAuth();

    return <>
        <nav>
            <Link className="nav_link" to="/">Meubles</Link>
            <Link className="nav_link" to="/material">Matériels</Link>

            {
                user && <>
                    <Link className="nav_link" to="/profile">Profile</Link>
                </>
            }
        </nav>
    </>
}