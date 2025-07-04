import { Link } from "react-router";
import { useAuth } from "../context/authContext";

export const Header = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch(err) {
            console.error(err);
        }
    }

    return <>
        <div className="header_container">
            <h1>Art Show</h1>
            {
                user ? <button className="header_logout" onClick={handleLogout}>Deconnexion</button>
                : <Link className="header_login" to="/login">Connexion</Link>
            }
        </div>
    </>
}