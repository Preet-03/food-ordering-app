import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './OrderConfirmationPage.css';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error('Failed to fetch order', err);
        setError(err.response?.data?.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="order-confirmation-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <h2>Loading your order details...</h2>
          <p>Please wait while we fetch your order information.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-confirmation-page">
        <div className="error-state">
          <div className="error-icon">❌</div>
          <h2 className="error-title">Oops! Something went wrong</h2>
          <p className="error-message">{error}</p>
          <Link to="/" className="action-btn primary">
            🏠 Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <span className="success-icon">🎉</span>
          <h1 className="confirmation-title">Order Confirmed!</h1>
          <p className="confirmation-subtitle">
            Thank you for your order! We're preparing your delicious meal.
          </p>
        </div>

        <div className="order-details">
          <div className="order-id-section">
            <div className="order-id-label">Order Reference</div>
            <div className="order-id">#{order._id.slice(-8).toUpperCase()}</div>
          </div>

          <div className="order-summary-grid">
            <div className="summary-card total">
              <h3>
                <span className="summary-card-icon">💰</span>
                Order Total
              </h3>
              <div className="total-amount">₹{order.totalPrice}</div>
              <div className="order-date">
                Placed on {formatDate(order.createdAt)}
              </div>
            </div>

            <div className="summary-card address">
              <h3>
                <span className="summary-card-icon">📍</span>
                Delivery Address
              </h3>
              <p className="address-text">
                {order.shippingAddress?.address}<br />
                {order.shippingAddress?.city}
                {order.shippingAddress?.state && `, ${order.shippingAddress.state}`}
                {order.shippingAddress?.zipCode && ` ${order.shippingAddress.zipCode}`}
              </p>
            </div>
          </div>

          <div className="order-items-section">
            <h3 className="section-title">
              <span className="summary-card-icon">🍽️</span>
              Order Items ({order.orderItems.length})
            </h3>
            <div className="items-list">
              {order.orderItems.map((item, index) => (
                <div key={index} className="item-row">
                  <div className="item-info">
                    <span className="item-quantity">×{item.qty}</span>
                    <span className="item-name">{item.name}</span>
                  </div>
                  <span className="item-price">₹{(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/profile" className="action-btn secondary">
            👤 View All Orders
          </Link>
          <Link to="/" className="action-btn primary">
            🍕 Order More Food
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
