import { Link } from "react-router"

export const Header = () => {
    return <>
        <div className="header_container">
            <h1>Art Show</h1>
            <Link className="header_login" to="/login" >
                Connexion
            </Link>
        </div>
    </>
}