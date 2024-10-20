import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    );
};

const Login = () => {
    const [_, setCookies] = useCookies(["access_token"]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await axios.post("http://localhost:3001/auth/login", {
                username,
                password,
            });

            setCookies("access_token", result.data.token);
            window.localStorage.setItem("userID", result.data.userID);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="login-username">Username:</label>
                    <input
                        type="text"
                        id="login-username" // Unique ID for Login username
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="login-password">Password:</label>
                    <input
                        type="password"
                        id="login-password" // Unique ID for Login password
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password,
            });
            alert("Registration Completed! Now login.");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="register-username">Username:</label>
                    <input
                        type="text"
                        id="register-username" // Unique ID for Register username
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="register-password">Password:</label>
                    <input
                        type="password"
                        id="register-password" // Unique ID for Register password
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};