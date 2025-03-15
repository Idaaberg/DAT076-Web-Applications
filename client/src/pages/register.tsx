import { useState } from "react";
import { checkUsernameExists, register } from "../api";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { Errors } from "../types/types";
import SuccessPopup from "../components/SuccessPopup";


/**
 * Defines the Register page
 * @returns Register page
 */
function Register() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Errors>({});
    const [showSuccess, setShowSuccess] = useState(false);

    const handleRegister = async (username: string, password: string) => {
        let newErrors: Errors = {};

        if (username.length === 0) {
            newErrors.username = "Username is required";
        }

        const exists = await checkUsernameExists(username);
        if (exists) {
            newErrors.username = "Username is already taken";
        }

        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await register(username, password);
            setShowSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <>
            {showSuccess && (
                <SuccessPopup message="Successfully registered!" onClose={() => setShowSuccess(false)} />
            )}
            <AuthForm
                title="Register"
                buttonText="Register"
                onSubmit={handleRegister}
                linkText="Cancel"
                linkTo="/login"
                errors={errors}
            />
        </>
    );
}

export default Register;