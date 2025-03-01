import { login } from "../api";
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
        <>
            <header className="bookShelfIcon">
                <h3 className="headerText">BookShelf</h3>
            </header>
            <main>
                <h1 className="loginHeader">Log In</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="Username">Username</label>
                    <input
                        id="Username"
                        className="loginInput"
                        type="username"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="Password">Password</label>
                    <input
                        id="Password"
                        className="loginInput"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="formBtns">
                        <button className="submitBtn" type="submit">Log In</button>
                        <a href="/register">
                            <p className="cancelBtn">Register</p>
                        </a>
                    </div>
                </form>
            </main>
        </>
    )

}

export default Login;