// src/components/Menu.js
import React, { useState } from 'react';
import './style/Menu.css';
import ProductModal from './ProductModal';
import useMenuItems from "./data/useMenuItems";

function Menu() {
    const { menuItems} = useMenuItems();
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="menu">
            <h2 className="section-title">Menu</h2>
            <div className="menu-items">
                {menuItems.map((item) => (
                    <div key={item.id} className="menu-item" onClick={() => openModal(item)}>
                        <img src={item.img} alt={item.name} className="menu-img"/>
                        <div className="menu-info">
                            <h3>{item.name}</h3>
                            <p>{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Модальное окно */}
            {selectedProduct && (
                <ProductModal product={selectedProduct} onClose={closeModal} />
            )}
        </div>
    );
}

export default Menu;
