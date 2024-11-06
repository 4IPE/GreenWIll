// src/components/ProductList.js
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import "./style/ProductList.css";

const ProductList = ({ products }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onOpenModal={openModal} />
            ))}
            <ProductModal product={selectedProduct} onClose={closeModal} />
        </div>
    );
};

export default ProductList;
