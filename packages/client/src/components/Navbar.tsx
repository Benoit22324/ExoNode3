import { Link } from "react-router"

export const Navbar = () => {
    return <>
        <nav>
            <Link className="nav_link" to="/">Meubles</Link>
            <Link className="nav_link" to="/material">Matériels</Link>
            <Link className="nav_link" to="/company">Fournisseurs</Link>
        </nav>
    </>
}