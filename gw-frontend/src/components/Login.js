import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/Login.css';
import apiClient from "./config/axiosConfig";

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await apiClient.post('/api/login', {
                username: login,
                password: password,
            });
            // Успешный вход
            console.log('Login successful:', response.data);
            console.log(document.cookie);
            navigate("/");
        } catch (err) {
            // Ошибка авторизации
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Welcome Back!</h2>
                <p className="login-subtitle">Log in to your account</p>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="login" className="input-label">Login</label>
                        <input
                            type="text"
                            id="login"
                            className="input-field"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="input-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="login-footer">
                    <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
                    <Link to="/register" className="register-link">Create an account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
