import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import './PlaceOrderPage.css';

const PlaceOrderPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  if (!user) {
    navigate('/register');
    return null;
  }

  const shippingAddress = user.address && user.city ? { address: user.address, city: user.city } : null;

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="place-order-page">
        <div className="place-order-container">
          <div className="page-header">
            <h1 className="page-title">🛒 Review Your Order</h1>
            <p className="page-subtitle">Almost there! Let's review your delicious choices</p>
          </div>
          <div className="empty-cart-state">
            <div className="empty-cart-icon">🍽️</div>
            <h2 className="empty-cart-title">Your cart is empty</h2>
            <p className="empty-cart-message">
              Looks like you haven't added any delicious items to your cart yet.
            </p>
            <Link to="/" className="start-shopping-btn">
              🛍️ Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // No shipping address state
  if (!shippingAddress) {
    return (
      <div className="place-order-page">
        <div className="place-order-container">
          <div className="page-header">
            <h1 className="page-title">🛒 Review Your Order</h1>
            <p className="page-subtitle">Almost there! Let's review your delicious choices</p>
          </div>
          <div className="no-address-state">
            <div className="no-address-icon">📍</div>
            <h2 className="no-address-title">Delivery Address Required</h2>
            <p className="no-address-message">
              Please add a delivery address to your profile before placing an order.
            </p>
            <Link to="/profile" className="add-address-btn">
              ➕ Add Address
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate prices
  const itemsPrice = Number(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2));
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const shippingPrice = 0; // Free shipping
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const placeOrderHandler = async () => {
    setIsPlacingOrder(true);
    
    try {
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentMethod,
      });
      
      clearCart();
      navigate(`/order/${data._id}`);
    } catch (error) {
      console.error('Order placement error:', error);
      alert(error.response?.data?.message || 'Error placing order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="place-order-page">
      <div className="place-order-container">
        <div className="page-header">
          <h1 className="page-title">🛒 Review Your Order</h1>
          <p className="page-subtitle">Almost there! Let's review your delicious choices</p>
        </div>

        <div className="order-review-content">
          <div className="main-content">
            {/* Shipping Address Section */}
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="section-icon">📍</span>
                  Delivery Address
                </h2>
                <Link to="/profile" className="edit-link">
                  ✏️ Edit
                </Link>
              </div>
              <div className="address-display">
                {shippingAddress.address}<br />
                {shippingAddress.city}
                {shippingAddress.state && `, ${shippingAddress.state}`}
                {shippingAddress.zipCode && ` ${shippingAddress.zipCode}`}
              </div>
            </div>

            {/* Order Items Section */}
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="section-icon">🍽️</span>
                  Order Items ({cartItems.length})
                </h2>
                <Link to="/cart" className="edit-link">
                  ✏️ Edit Cart
                </Link>
              </div>
              <div className="order-items">
                {cartItems.map(item => (
                  <div key={item._id} className="order-item">
                    <img 
                      src={item.image || '/images/placeholder.png'} 
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <div className="item-info">
                        <div className="item-name">{item.name}</div>
                        <div className="item-restaurant">
                          from {item.restaurantName || 'Restaurant'}
                        </div>
                      </div>
                      <div className="item-quantity">×{item.qty}</div>
                      <div className="item-price">₹{(item.qty * item.price).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="sidebar">
            <div className="order-summary-card">
              <h3 className="summary-title">
                <span className="section-icon">💰</span>
                Order Summary
              </h3>
              
              <div className="summary-row">
                <span className="summary-label">
                  Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </span>
                <span className="summary-value">₹{itemsPrice.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span className="summary-label">Tax (15%)</span>
                <span className="summary-value">₹{taxPrice.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span className="summary-label">Shipping</span>
                <span className="summary-value">
                  {shippingPrice === 0 ? (
                    <span style={{ color: '#28a745', fontWeight: '600' }}>FREE 🎉</span>
                  ) : (
                    `₹${shippingPrice.toFixed(2)}`
                  )}
                </span>
              </div>
              
              <div className="summary-row">
                <span className="summary-label">Payment Method</span>
                <select 
                  value={paymentMethod} 
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #e9ecef',
                    borderRadius: '5px',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Card Payment">Card Payment</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
              
              <div className="summary-row total">
                <span className="summary-label">Total Amount</span>
                <span className="summary-value total">₹{totalPrice.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={placeOrderHandler} 
                disabled={cartItems.length === 0 || isPlacingOrder}
                className={`place-order-btn ${isPlacingOrder ? 'btn-loading' : ''}`}
              >
                {isPlacingOrder ? (
                  'Processing Order...'
                ) : (
                  <>
                    🚀 Place Order
                  </>
                )}
              </button>
              
              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#6c757d' }}>
                💳 Secure payment • 🔒 Your data is protected
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;