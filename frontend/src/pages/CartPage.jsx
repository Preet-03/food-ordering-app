// frontend/src/pages/CartPage.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, adjustQuantity } = useContext(CartContext);

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                {/* We can add an image later */}
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => adjustQuantity(item._id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => adjustQuantity(item._id, 1)}>+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="remove-btn">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items): <strong>₹{subtotal}</strong></p>
            <button className="checkout-btn" disabled={cartItems.length === 0}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;