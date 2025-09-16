// frontend/src/components/Hero.jsx
import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Your next meal, delivered.</h1>
        <p className="hero-subtitle">Discover the best food from over 1,000 restaurants.</p>
        <div className="search-bar">
          <input type="text" placeholder="Enter your delivery address" />
          <button>Find Food</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;