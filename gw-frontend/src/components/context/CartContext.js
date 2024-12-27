// src/context/CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

   const addToCart = (product) => {
       setCartItems((prevItems) => {
           const existingItem = prevItems.find((item) => item.id === product.id);
           if (existingItem) {
               return prevItems.map((item) =>
                   item.id === product.id
                       ? { ...item, quantity: item.quantity + (product.quantity || 1) } // Если quantity не передано, по умолчанию добавляем 1
                       : item
               );
           } else {
               return [...prevItems, { ...product, quantity: product.quantity || 1 }]; // Убедитесь, что quantity всегда есть
           }
       });
   };

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
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                incrementQuantity,
                decrementQuantity,
                removeItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
