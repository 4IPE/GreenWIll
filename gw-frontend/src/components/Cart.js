import React, { useState } from "react";
import "./style/Cart.css";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Смузи Манго", price: 300, quantity: 1 },
        { id: 2, name: "Салат Фреш", price: 200, quantity: 2 },
    ]);

    // Обработчики для добавления, удаления и изменения количества
    const incrementQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <div className="cart">
            <h1>Корзина</h1>
            <div className="cart-items">
                {cartItems.map((item) => (
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
                ))}
            </div>

            <div className="cart-summary">
                <h2>Итого: {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)} ₽</h2>
                <button className="checkout-button">Оформить заказ</button>
            </div>
        </div>
    );
};

export default Cart;
