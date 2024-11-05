// Menu.js
import React from 'react';
import './style/Menu.css';

function Menu() {
    const menuItems = [
        {
            name: "Greek Salad",
            price: "€8.99",
            img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
        },
        {
            name: "Grilled Chicken Plate",
            price: "€12.99",
            img: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            name: "Fruit Smoothie",
            price: "€4.99",
            img: "https://media.istockphoto.com/id/527673038/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D0%B2%D0%B5%D0%B6%D0%B5%D0%B9-%D1%81%D0%BC%D0%B5%D1%88%D0%B0%D0%BD%D0%BD%D1%8B%D0%B9-%D1%84%D1%80%D1%83%D0%BA%D1%82%D0%BE%D0%B2%D1%8B%D0%B9-%D1%81%D0%BC%D1%83%D0%B7%D0%B8-%D1%80%D0%B0%D0%B7%D0%BB%D0%B8%D1%87%D0%BD%D1%8B%D1%85-%D1%86%D0%B2%D0%B5%D1%82%D0%BE%D0%B2-%D0%B8-%D0%B2%D0%BA%D1%83%D1%81.jpg?b=1&s=612x612&w=0&k=20&c=zjzae1LifliWAEGhdukzgt14z93uj1AUoiycs03e72U="
        },
        // Добавьте больше пунктов меню, если нужно
    ];

    return (
        <div className="menu">
            <h2 className="section-title">Menu</h2>
            <div className="menu-items">
                {menuItems.map((item, index) => (
                    <div key={index} className="menu-item">
                        <img src={item.img} alt={item.name} className="menu-img"/>
                        <div className="menu-info">
                            <h3>{item.name}</h3>
                            <p>{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
