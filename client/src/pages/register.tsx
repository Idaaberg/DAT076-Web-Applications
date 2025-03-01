import { register } from "../api";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const handleRegister = async (username: string, password: string) => {
        try {
            await register(username, password);
            navigate("/login");
        } catch (error) {
            console.error("Error in Register:", error);
        }
    };

    return (
        <AuthForm
            title="Register"
            buttonText="Register"
            onSubmit={handleRegister}
            linkText="Cancel"
            linkTo="/login"
        />
    );
}

export default Register;
