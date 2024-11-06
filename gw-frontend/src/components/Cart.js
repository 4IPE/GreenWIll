// src/components/Cart.js
import React, { useContext } from "react";
import "./style/Cart.css";
import {FaTrashAlt} from "react-icons/fa";
import { CartContext } from './context/CartContext';
import {Link} from "react-router-dom";

const Cart = () => {
    const { cartItems, incrementQuantity, decrementQuantity, removeItem } = useContext(CartContext);

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
                <Link to="/menu" className="checkout-button">
                    <button >Оформить заказ</button>
                </Link>

            </div>
        </div>
    );
};

export default Cart;
