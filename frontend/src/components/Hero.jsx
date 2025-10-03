// frontend/src/components/Hero.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      if (onSearch) {
        // If onSearch prop is provided, use it (for RestaurantListPage)
        onSearch(searchTerm.trim());
      } else {
        // Otherwise, navigate to restaurants page with search
        navigate(`/restaurants?search=${encodeURIComponent(searchTerm.trim())}`);
      }
    }
  };

  return (
    <div className="hero-container">
      {/* Floating Food Icons */}
      <div className="food-icon">🍕</div>
      <div className="food-icon">🍔</div>
      <div className="food-icon">🍜</div>
      <div className="food-icon">🌮</div>
      
      <div className="hero-content">
        <h1 className="hero-title">Your next meal, delivered.</h1>
        <p className="hero-subtitle">Discover the best food from over 1,000 restaurants and satisfy your cravings with just a few clicks.</p>
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search restaurants, cuisine, dishes, or address" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Find Food</button>
        </form>
      </div>
    </div>
  );
};

export default Hero;