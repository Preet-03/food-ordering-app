import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, adjustQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const checkoutHandler = () => {
    if (user) {
      navigate('/placeorder');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container-wrapper">
        <div className="cart-header">
          <h1 className="cart-title">🛒 Your Shopping Cart</h1>
          <p className="cart-subtitle">
            {cartItems.length > 0 
              ? `${totalItems} delicious item${totalItems > 1 ? 's' : ''} waiting for you!`
              : "Ready to fill up with amazing food?"
            }
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-cart-icon">🍽️</div>
            <h2 className="empty-cart-title">Your cart is empty</h2>
            <p className="empty-cart-message">
              Looks like you haven't added any delicious items to your cart yet.<br />
              Explore our amazing restaurants and discover your next favorite meal!
            </p>
            <Link to="/" className="start-shopping-btn">
              🛍️ Start Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-section">
              {cartItems.map((item, index) => (
                <div 
                  key={item._id} 
                  className="cart-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="cart-item-content">
                    <img 
                      src={item.image || '/images/placeholder.png'} 
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-restaurant">
                        from {item.restaurantName || 'Restaurant'}
                      </p>
                      <p className="item-price">₹{item.price.toFixed(2)} each</p>
                      <p className="item-total">
                        Total: ₹{(item.qty * item.price).toFixed(2)}
                      </p>
                    </div>
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => adjustQuantity(item._id, -1)}
                          disabled={item.qty <= 1}
                        >
                          −
                        </button>
                        <span className="quantity-display">{item.qty}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => adjustQuantity(item._id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item._id)} 
                        className="remove-btn"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="continue-shopping">
                <Link to="/" className="continue-shopping-link">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            <div className="cart-summary">
              <h2 className="summary-title">📋 Order Summary</h2>
              
              <div className="summary-row">
                <span className="summary-label">
                  Items ({totalItems})
                </span>
                <span className="summary-value">₹{subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span className="summary-label">Delivery Fee</span>
                <span className="summary-value" style={{ color: '#28a745', fontWeight: '600' }}>
                  FREE 🎉
                </span>
              </div>
              
              <div className="summary-row total">
                <span className="summary-label">Total Amount</span>
                <span className="summary-value total">₹{subtotal.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={checkoutHandler} 
                className="checkout-btn" 
                disabled={cartItems.length === 0}
              >
                🚀 Proceed to Checkout
              </button>
              
              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#6c757d' }}>
                💳 Secure checkout • 🔒 Your data is protected
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
