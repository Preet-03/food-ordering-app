// frontend/src/pages/MenuPage.jsx
import React, { useState, useEffect } from 'react'; // Removed unused useContext import
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { useCart } from '../context/CartContext'; // Import useCart hook
import './MenuPage.css';

const MenuPage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { addToCart } = useCart(); // Get addToCart from context

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/restaurants/${id}`);
        setRestaurant(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  const handleAddToCart = (item) => {
    const itemWithRestaurant = { ...item, restaurantId: restaurant._id };
    addToCart(itemWithRestaurant);
    // Show success alert
    alert(`${item.name} has been added to your cart! 🛒`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  return (
    <div className="menu-page">
      <div className="restaurant-header">
        <img src={restaurant.imageUrl} alt={restaurant.name} />
        <h1>{restaurant.name}</h1>
        <p>{restaurant.cuisine} | {restaurant.address} | {restaurant.rating} ⭐</p>
      </div>
      
      <h2>Menu</h2>
      <div className="menu-items">
        {restaurant.menu.map((item) => (
          <div key={item._id} className="menu-item">
            <img src={item.image} alt={item.name} className="menu-item-img" />
            <div className="menu-item-body">
              <h3 className="menu-item-title">{item.name}</h3>
              <p className="menu-item-desc">{item.description}</p>
            </div>
            <div className="menu-item-price">
              <span>₹{item.price}</span>
              <button 
                className="add-to-cart-btn" 
                onClick={() => handleAddToCart(item)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;