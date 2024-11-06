// src/components/ProductModal.js
import React, { useState, useContext } from "react";
import { CartContext } from "./context/CartContext";
import "./style/ProductModal.css";

const ProductModal = ({ product, onClose }) => {
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        onClose();
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

                <button className="add-to-cart-button" onClick={handleAddToCart}>
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
};

export default ProductModal;
