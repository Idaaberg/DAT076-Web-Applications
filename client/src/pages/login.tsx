import { Link } from "react-router-dom";
import { login } from "../api";
import '../styles/Form.css';
import '../styles/login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 



function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await login(username, password);
            navigate("/home");
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    return (
        <main>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="submitBtn" type="submit">Log In</button>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </form>
        </main>
    )
}

export default Login;