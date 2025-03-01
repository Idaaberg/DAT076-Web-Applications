import { register } from "../api";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const handleRegister = async (username: string, password: string) => {
        await register(username, password);
        navigate("/login");
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
