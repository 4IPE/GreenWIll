import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; // Добавлен импорт Link
import "./style/Cart.css";
import { FaTrashAlt } from "react-icons/fa";
import { CartContext } from './context/CartContext';
import apiClient from "./config/axiosConfig";

const Cart = () => {
    const { cartItems, incrementQuantity, decrementQuantity, removeItem } = useContext(CartContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние для проверки авторизации
    const navigate = useNavigate();

    // Проверка наличия токена на сервере
    const checkTokenStatus = async () => {
        try {
            const response = await apiClient.get("/api/user/status", { withCredentials: true });
            if (response.status === 200) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                navigate("/login"); // Если токен невалидный, перенаправляем на страницу логина
            }
        } catch (err) {
            setIsLoggedIn(false);
            if (err.response && err.response.status === 401) {
                navigate("/login"); // Если токен невалидный, перенаправляем на страницу логина
            }
        }
    };

    // Проверка авторизации при монтировании компонента
    useEffect(() => {
        checkTokenStatus();
    }, [navigate]);



    return (
        <div className="cart">
            <h1>Корзина</h1>
            <div className="cart-items">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <p className="item-name">{item.name}</p>
                            <p className="item-price">{item.price} ₽</p>
                            <div className="item-quantity">
                                <button onClick={() => decrementQuantity(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => incrementQuantity(item.id)}>+</button>
                            </div>
                            <FaTrashAlt className="delete-icon" onClick={() => removeItem(item.id)} />
                        </div>
                    ))
                ) : (
                    <p>Ваша корзина пуста.</p>
                )}
            </div>

            <div className="cart-summary">
                <h2>Итого: {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)} ₽</h2>
                <Link to="/" className="checkout-button">
                    <button>Оформить заказ</button>
                </Link>
            </div>
        </div>
    );
};

export default Cart;
