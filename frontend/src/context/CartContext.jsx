// frontend/src/context/CartContext.jsx
import React, { createContext, useState } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (itemToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === itemToAdd._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === itemToAdd._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevItems, { ...itemToAdd, qty: 1 }];
      }
    });
  };

  const removeFromCart = (idToRemove) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== idToRemove));
  };

  const adjustQuantity = (itemId, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === itemId ? { ...item, qty: item.qty + amount } : item
        )
        .filter((item) => item.qty > 0) // Remove item if quantity becomes 0
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, adjustQuantity }}>
      {children}
    </CartContext.Provider>
  );
};