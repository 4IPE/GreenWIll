import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Для навигации
import { CartContext } from "./context/CartContext";
import apiClient from "./config/axiosConfig";
import "./style/ProductModal.css";

const ProductModal = ({ product, onClose }) => {
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate(); // Используем navigate для редиректа

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const checkTokenStatus = async () => {
        try {
            const response = await apiClient.get("/api/user/status", { withCredentials: true });
            if (response.status === 200) {
                // Токен действителен, продолжаем
                handleAddToCart();
            } else {
                // Если токен невалидный, перенаправляем на страницу логина
                navigate("/login");
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                // Если токен невалидный, перенаправляем на страницу логина
                navigate("/login");
            }
        }
    };

    const handleAddToCart = () => {
        console.log("Добавляем продукт:", { ...product, quantity });
        addToCart({ ...product, quantity });
        onClose();
    };

    const handleAddToCartWithAuthCheck = () => {
        checkTokenStatus(); // Проверяем токен перед добавлением в корзину
    };

    return (
        <div className="product-modal">
            <div className="product-modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <img src={product.image} alt={product.name} className="product-modal-img" />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Цена: {product.price} ₽</p>

                <div className="quantity-selector">
                    <button onClick={decrementQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={incrementQuantity}>+</button>
                </div>

                <button className="add-to-cart-button" onClick={handleAddToCartWithAuthCheck}>
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
};

export default ProductModal;
