// frontend/src/pages/MenuPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MenuPage.css'; // We'll create this file

const MenuPage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get the 'id' from the URL

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
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <div className="menu-item-price">
              <span>₹{item.price}</span>
              <button className="add-to-cart-btn">+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;