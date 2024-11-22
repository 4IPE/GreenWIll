import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/Account.css";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import apiClient from './config/axiosConfig';

const Account = () => {
    const [username, setUsername] = useState(null); // Имя пользователя
    const [error, setError] = useState(null); // Ошибки
    const navigate = useNavigate();

    // Функция выхода из аккаунта
    const handleLogout = async () => {
        try {
            await apiClient.post("/logout", {}, { withCredentials: true });
            navigate("/login");
        } catch (err) {
            console.error("Ошибка при выходе:", err);
        }
    };

    // Получение имени пользователя при загрузке компонента
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await apiClient.get("/user/get", { withCredentials: true });
                setUsername(response.data.username); // Устанавливаем username
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    // Пользователь не авторизован, перенаправляем на вход
                    navigate("/login");
                } else {
                    setError("Не удалось загрузить имя пользователя.");
                }
            }
        };

        fetchUsername();
    }, [navigate]);

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!username) {
        return <p>Загрузка данных...</p>; // Пока данные загружаются
    }

    return (
        <div className="account">
            <div className="account-header">
                <FaUserCircle className="account-icon" />
                <h1>Добро пожаловать, {username}!</h1>
            </div>

            <div className="account-actions">
                <button className="logout-button" onClick={handleLogout}>
                    <FaSignOutAlt /> Выйти из аккаунта
                </button>
            </div>
        </div>
    );
};

export default Account;
