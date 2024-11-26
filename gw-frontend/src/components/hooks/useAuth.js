// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../config/axiosConfig"; // Ваш apiClient для проверки авторизации

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Проверка статуса авторизации
    const checkTokenStatus = async () => {
        try {
            const response = await apiClient.get("/api/user/status", { withCredentials: true });
            if (response.status === 200) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                navigate("/login");
            }
        } catch (err) {
            setIsLoggedIn(false);
            if (err.response && err.response.status === 401) {
                navigate("/login"); // Перенаправляем на страницу логина, если токен невалидный
            }
        }
    };

    // Проверяем статус при монтировании компонента
    useEffect(() => {
        checkTokenStatus();
    }, [navigate]);

    return { isLoggedIn, navigate };
};

export default useAuth;
