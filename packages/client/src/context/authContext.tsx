import React, { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { AuthContextType } from "../typings/AuthContextType";
import type { AuthInput } from "../typings/AuthInput";
import type { User } from "../typings/User";
import axios from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [ user, setUser ] = useState<User | null>(null);

    const login = async (input: AuthInput) => {
        const { email, password } = input;

        try {
            await axios.post("http://localhost:3000/auth/login", {
                email,
                password
            }, {
                withCredentials: true
            })

            const user = await axios.get("http://localhost:3000/user", {
                withCredentials: true
            })

            setUser(user.data.data);

            return true;
        } catch(err) {
            throw new Error("Erreur lors de la connexion");
        }
    };

    const logout = async () => {
        try {
            await axios.get("http://localhost:3000/auth/logout", {
                withCredentials: true
            });

            setUser(null);
        } catch(err) {
            throw new Error("Erreur lros de la déconnexion");
        }
    }

    const authContextValue: AuthContextType = {
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Erreur lors de l'initialisation de l'Auth Context");
    }

    return context;
}