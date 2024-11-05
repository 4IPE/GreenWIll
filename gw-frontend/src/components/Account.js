import React from "react";
import "./style/Account.css";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Account = () => {
    return (
        <div className="account">
            <div className="account-header">
                <FaUserCircle className="account-icon" />
                <h1>Добро пожаловать, [Имя Пользователя]</h1>
            </div>

            <div className="account-info">
                <h2>Мои данные</h2>
                <p>Электронная почта: user@example.com</p>
                <p>Номер телефона: +123456789</p>
            </div>

            <div className="account-orders">
                <h2>Мои заказы</h2>
                <ul className="orders-list">
                    <li className="order-item">Заказ №001 - Доставлен</li>
                    <li className="order-item">Заказ №002 - В пути</li>
                    <li className="order-item">Заказ №003 - Ожидает оплаты</li>
                </ul>
            </div>

            <div className="account-actions">
                <h2>Настройки</h2>
                <button className="logout-button">
                    <FaSignOutAlt /> Выйти из аккаунта
                </button>
            </div>
        </div>
    );
};

export default Account;
