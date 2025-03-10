import { useState } from "react";
import { login } from "../api";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { Errors } from "../types/types";


function Login() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Errors>({});

    const handleLogin = async (username: string, password: string) => {
        let newErrors: Errors = {};
        
        if (username.length === 0) {
            newErrors.username = "Username is required";
        }
        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await login(username, password);
            navigate("/home");
        } catch (error) {
            console.error("Login failed:", error);
            // Check if the error is an AxiosError with a response and status code 401
    if (error instanceof Error && (error as any).response && (error as any).response.status === 401) {
                setErrors({ password: "Incorrect username or password" });
            }
        }
    };

    return (
        <AuthForm
            title="Log In"
            buttonText="Log In"
            onSubmit={handleLogin}
            linkText="Register"
            linkTo="/register"
            errors={errors}
        />
    );
}

export default Login;
