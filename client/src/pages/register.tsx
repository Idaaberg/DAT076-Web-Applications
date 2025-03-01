import { Link } from "react-router-dom";
import { register } from "../api";
import '../styles/login.css';
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
        <>
            <header className="bookShelfIcon">
                <h3 className="headerText">BookShelf</h3>
            </header>
            <main>
                <h1 className="loginHeader">Register</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        className="loginInput"
                        type="username"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>Password</label>
                    <input
                        className="loginInput"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="formBtns">
                        <button className="submitBtn" type="submit">Register</button>
                        <a href="/login">
                            <p className="cancelBtn">Cancel</p>
                        </a>
                    </div>
                </form>
            </main>
        </>
    )
}

export default Register;