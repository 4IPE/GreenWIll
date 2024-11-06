// src/components/Menu.js
import React, { useState } from 'react';
import './style/Menu.css';
import ProductModal from './ProductModal';

function Menu() {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const menuItems = [
        {
            id: 1,
            name: "Greek Salad",
            price: "8.99",
            img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            calories: 150,
            description: "Свежий греческий салат с оливками, помидорами и сыром фета."
        },
        {
            id: 2,
            name: "Grilled Chicken Plate",
            price: "12.99",
            img: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=800",
            calories: 400,
            description: "Куриная грудка на гриле с овощами и гарниром."
        },
        {
            id: 3,
            name: "Fruit Smoothie",
            price: "4.99",
            img: "https://media.istockphoto.com/id/527673038/ru/фото/свежей-смешанный-фруктовый-смузи.jpg?b=1&s=612x612&w=0&k=20&c=zjzae1LifliWAEGhdukzgt14z93uj1AUoiycs03e72U=",
            calories: 200,
            description: "Фруктовый смузи, богатый витаминами и антиоксидантами."
        },
    ];

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
