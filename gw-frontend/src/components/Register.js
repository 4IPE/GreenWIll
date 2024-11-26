import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/Register.css';
import apiClient from "./config/axiosConfig";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await apiClient.post('/api/register', {
                username: username,
                password: password,
            });
            // Успешная регистрация
            console.log('Registration successful:', response.data);
            // Перенаправление на страницу входа
            navigate('/');
        } catch (err) {
            // Ошибка регистрации
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-title">Create Account</h2>
                <p className="register-subtitle">Sign up for a new account</p>
                <form className="register-form" onSubmit={handleRegister}>
                    <div className="input-group">
                        <label htmlFor="username" className="input-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <button type="submit" className="register-button">Register</button>
                </form>
                <div className="register-footer">
                    <p>Already have an account?</p>
                    <Link to="/login" className="login-link">Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
