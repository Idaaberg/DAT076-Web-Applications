import { login } from "../api";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleLogin = async (username: string, password: string) => {
        await login(username, password);
        navigate("/home");
    };

    return (
        <AuthForm
            title="Log In"
            buttonText="Log In"
            onSubmit={handleLogin}
            linkText="Register"
            linkTo="/register"
        />
    );
}

export default Login;
