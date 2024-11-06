// src/components/ProductModal.js
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './style/ProductModal.css';

const ProductModal = ({ product, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    <FaTimes />
                </button>
                <img src={product.img} alt={product.name} className="modal-image" />
                <h2 className="modal-title">{product.name}</h2>
                <p className="modal-description">{product.description}</p>
                <p className="modal-calories">Калории: {product.calories} ккал</p>
                <p className="modal-price">Цена: {product.price}</p>
                <button className="modal-add-to-cart">Добавить в корзину</button>
            </div>
        </div>
    );
};

export default ProductModal;
