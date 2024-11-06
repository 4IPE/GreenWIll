// src/components/ProductCard.js
import React from "react";
import "./style/ProductCard.css";

const ProductCard = ({ product, onOpenModal }) => {
    return (
        <div className="product-card" onClick={() => onOpenModal(product)}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price} ₽</p>
        </div>
    );
};

export default ProductCard;
