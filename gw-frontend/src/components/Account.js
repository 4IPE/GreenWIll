import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Account.css";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import apiClient from "./config/axiosConfig";
import Cookies from "js-cookie";
import FAQ from "./FAQ"; // Импортируем библиотеку для работы с куки

const Account = () => {
    const [username, setUsername] = useState(null); // Имя пользователя
    const [error, setError] = useState(null); // Ошибки
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Стейт для проверки, залогинен ли пользователь
    const navigate = useNavigate();

    // Функция выхода из аккаунта
    const handleLogout = async () => {
        try {
            await apiClient.get("/api/logout", { withCredentials: true });
            setIsLoggedIn(false);
            navigate("/");
        } catch (err) {
            console.error("Ошибка при выходе:", err);
        }
    };

    // Проверка наличия токена на сервере
    const checkTokenStatus = async () => {
        try {
            const response = await apiClient.get("/api/user/status", { withCredentials: true });
            if (response.status === 200) {
                setIsLoggedIn(true);
                fetchUsername(); // Если токен существует, получаем имя пользователя
            } else {
                setIsLoggedIn(false);
            }
        } catch (err) {
            setIsLoggedIn(false);
            if (err.response && err.response.status === 401) {
                navigate("/login"); // Если токен невалидный, перенаправляем на страницу логина
            }
        }
    };

    // Получение имени пользователя
    const fetchUsername = async () => {
        try {
            const response = await apiClient.get("/api/user/get", { withCredentials: true });
            setUsername(response.data.username); // Устанавливаем имя пользователя
        } catch (err) {
            setError("Не удалось загрузить имя пользователя.");
        }
    };

    // Запуск проверки токена и получения имени пользователя при монтировании компонента
    useEffect(() => {
        checkTokenStatus(); // Проверяем наличие токена

    }, [navigate]);

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="account">
            <div className="account-header">
                <FaUserCircle className="account-icon" />
                {isLoggedIn ? (
                    <h1>Добро пожаловать, {username}!</h1>
                ) : (
                    <h1></h1>
                )}
            </div>
            {isLoggedIn && (
                <div className="account-actions">
                    <button className="logout-button" onClick={handleLogout}>
                        <FaSignOutAlt /> Выйти из аккаунта
                    </button>
                </div>
            )}
            <FAQ/>
        </div>
    );
};

export default Account;
