// frontend/src/components/ProductCard.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, restaurant, showItemRating = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Create the item in the same format as MenuPage
    const itemWithRestaurant = { 
      ...product, 
      restaurantId: restaurant._id,
      restaurantName: restaurant.name // Add restaurant name for cart display
    };
    addToCart(itemWithRestaurant);
    // Show success alert
    alert(`${product.name} has been added to your cart! 🛒`);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
        />
        <div className="restaurant-badge">
          {restaurant.name}
        </div>
      </div>
      
      <div className="product-details">
        <div className="product-body">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
        </div>
        
        <div className="product-footer">
          <div className="restaurant-info">
            <span className="restaurant-cuisine">🍽️ {restaurant.cuisine}</span>
            <div className="rating-section">
              {showItemRating && product.rating ? (
                <span className="item-rating">⭐ {product.rating.toFixed(1)} (Item)</span>
              ) : (
                <span className="restaurant-rating">⭐ {restaurant.rating} (Rest.)</span>
              )}
            </div>
          </div>
          
          <div className="product-price-section">
            <span className="product-price">₹{product.price}</span>
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;