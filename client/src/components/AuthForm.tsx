import { useState } from "react";
import "../styles/login.css";
import { Errors } from "../types/types";


interface AuthFormProps {
    title: string;
    buttonText: string;
    onSubmit: (username: string, password: string) => Promise<void>;
    linkText: string;
    linkTo: string;
    errors:  Errors;
}

function AuthForm({ title, buttonText, onSubmit, linkText, linkTo, errors }: AuthFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onSubmit(username, password);
        } catch (error) {
            console.error(`Error in ${title}:`, error);
        }
    };

    return (
        <>
            <header className="bookShelfIcon">
                <h3 className="headerText">BookShelf</h3>
            </header>
            <main>
                <h1 className="loginHeader">{title}</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        className={`loginInput ${errors.username ? 'inputError' : ''}`}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}   
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        className={`loginInput ${errors.password ? 'inputError' : ''}`}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <div className="formBtns">
                        <button className="submitBtn" type="submit">{buttonText}</button>
                        <a href={linkTo}>
                            <p className="cancelBtn">{linkText}</p>
                        </a>
                    </div>
                </form>
            </main>
        </>
    );
}

export default AuthForm;
