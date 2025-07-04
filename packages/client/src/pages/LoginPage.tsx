import { Controller, useForm } from "react-hook-form"
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";
import { useState } from "react";

export const LoginPage = () => {
    const { login } = useAuth();
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
    const {
        control,
        formState: { errors },
        handleSubmit
    } = useForm();

    const navigate = useNavigate();

    const handleFormSubmit = async (data: any) => {
        try {
            const formData = {
                email: data.email,
                password: data.password
            }

            const response = await login(formData);

            if (response) navigate("/");
        } catch(err) {
            setErrorMessage("Identifiant Incorrecte");
        }
    }

    return <>
        <div className="login_container">
            <h2 className="box">Page de connexion</h2>

            {
                errorMessage === "Identifiant Incorrecte" && <p className="error_message">{errorMessage}</p>
            }

            <form className="login_form box" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="login_input_container">
                    <label>Email:</label>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="email"
                        defaultValue={""}
                        render={({ field }) => <input
                            className="login_input"
                            type="email"
                            {...field}
                        />}
                    />
                </div>

                {
                    errors.email && <p className="error_message">Veuillez saisir un Email</p>
                }

                <div className="login_input_container">
                    <label>Mot de passe:</label>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="password"
                        defaultValue={""}
                        render={({ field }) => <input
                            className="login_input"
                            type="password"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                            {...field}
                        />}
                    />
                </div>

                {
                    errors.password && <p className="error_message">Veuillez saisir un Mot de passe</p>
                }

                <button className="login_submit" type="submit">Se Connecter</button>
            </form>
        </div>
    </>
}