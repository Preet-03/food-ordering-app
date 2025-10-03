import React, { createContext, useState, useContext } from 'react';

// 1. Create the context (we don't export this)
const CartContext = createContext(null);

// 2. Create the custom hook that we export for other components to use
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// 3. Create the Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (itemToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === itemToAdd._id);
      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item._id === itemToAdd._id ? { ...item, qty: item.qty + 1 } : item
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        const updatedItems = [...prevItems, { ...itemToAdd, qty: 1 }];
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return updatedItems;
      }
    });
  };

  const removeFromCart = (idToRemove) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item._id !== idToRemove);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const adjustQuantity = (itemId, amount) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) =>
          item._id === itemId ? { ...item, qty: item.qty + amount } : item
        )
        .filter((item) => item.qty > 0);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, adjustQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};