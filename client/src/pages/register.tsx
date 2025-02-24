import { Link } from "react-router-dom";
import { register } from "../api";
import '../styles/Form.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 



function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await register(username, password);
            navigate("/login");
        } catch (error) {
            console.error("Error registering:", error);
        }
    }

    return (
        <main>
            <h1>Register</h1>
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
                <button className="submitBtn" type="submit">Register</button>
                
                <Link to="/login">
                    <button className="cancelBtn" type="button">Cancel</button>
                </Link>
            </form>
        </main>
    )
}

export default Register;