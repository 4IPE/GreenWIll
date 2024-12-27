import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import "./style/Account.css";
import { FaUserCircle, FaSignOutAlt, FaEdit, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import apiClient from "./config/axiosConfig";
import FAQ from "./FAQ";
import Instructions from "./Instructions";

const Account = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthorization();
    }, []);

    const checkAuthorization = async () => {
        try {
            const response = await apiClient.get("/api/user/status", { withCredentials: true });
            if (response.status === 200) {
                setIsAuthorized(true);
                fetchUserProfile();
            } else {
                setIsAuthorized(false);
                navigate("/login");
            }
        } catch (err) {
            console.error("Ошибка проверки статуса авторизации:", err);
            setIsAuthorized(false);
            navigate("/login");
        }
    };
    const handleLogout = async () => {
        try {
            await apiClient.get("/api/logout", { withCredentials: true });
            setIsAuthorized(false);
            navigate("/");
        } catch (err) {
            console.error("Ошибка при выходе:", err);
        }
    };


    const fetchUserProfile = async () => {
        try {
            const response = await apiClient.get("/api/user/profile", { withCredentials: true });
            setUser(response.data);
        } catch (err) {
            console.error("Ошибка при загрузке профиля:", err);
        }
    };

    const handleSaveProfile = async () => {
        try {
            await apiClient.post(
                "/api/user/profile",
                { ...user },
                { withCredentials: true }
            );
            setIsEditing(false);
            fetchUserProfile();
        } catch (err) {
            console.error("Ошибка при обновлении профиля:", err);
        }
    };

    return (
        <div className="account">
            {isAuthorized ? (
                <>
                    <div className="account-header">
                        <FaUserCircle className="account-icon" />
                        <h1>Добро пожаловать, {user?.username || "Гость"}!</h1>
                    </div>

                    <div className="profile-section">
                        {isEditing ? (
                            <div className="editing-section">

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Имя</label>
                                        <input
                                            type="text"
                                            placeholder="Введите имя"
                                            value={user?.firstName || ""}
                                            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Фамилия</label>
                                        <input
                                            type="text"
                                            placeholder="Введите фамилию"
                                            value={user?.lastName || ""}
                                            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Почта */}
                                <div className="form-row">
                                    <div className="form-group full-width">
                                        <label>
                                            <FaEnvelope /> Электронная почта
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Введите email"
                                            value={user?.email || ""}
                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Телефон */}
                                <div className="form-row">
                                    <div className="form-group full-width">
                                        <label>
                                            <FaPhone /> Телефон
                                        </label>
                                        <InputMask
                                            mask="+7 (999) 999-99-99"
                                            placeholder="Введите номер телефона"
                                            value={user?.phone || ""}
                                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Адрес */}
                                <div className="form-row">
                                    <div className="form-group full-width">
                                        <label>
                                            <FaMapMarkerAlt /> Адрес
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Введите адрес (например, Москва, ул. Тверская, д. 1)"
                                            value={user.address || ""}
                                            onChange={(e) => setUser({ ...user, address: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Кнопка сохранения */}
                                <button className="save-button" onClick={handleSaveProfile}>
                                    Сохранить
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p>Имя: {user?.firstName || "Не указано"}</p>
                                <p>Фамилия: {user?.lastName || "Не указано"}</p>
                                <p>Электронная почта: {user?.email || "Не указано"}</p>
                                <p>Телефон: {user?.phone || "Не указано"}</p>
                                <p>Адрес: {user?.address || "Не указано"}</p>
                                <button
                                    className="edit-button"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <FaEdit /> Редактировать
                                </button>
                            </div>
                        )}
                    </div>

                    <button className="logout-button" onClick={handleLogout}>
                        <FaSignOutAlt /> Выйти
                    </button>
                </>
            ) : (
                <div className="login-notice">
                    <p>Пожалуйста, войдите в систему, чтобы увидеть данные аккаунта.</p>
                    <button
                        className="login-button"
                        onClick={() => navigate("/login")}
                    >
                        Войти
                    </button>
                </div>
            )}
            <Instructions/>
            <FAQ/>
        </div>
    );
};

export default Account;
