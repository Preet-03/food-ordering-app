// src/pages/HomePage.jsx

import React from 'react';
import Hero from '../components/Hero';

const HomePage = () => {
  return (
    <div className="homepage">
      <Hero />
      <div className="homepage-content">
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Why Choose Us?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🚚</div>
                <h3>Fast Delivery</h3>
                <p>Get your food delivered in 30 minutes or less</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🍕</div>
                <h3>Quality Food</h3>
                <p>Fresh ingredients from the best restaurants</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💳</div>
                <h3>Easy Payment</h3>
                <p>Secure and convenient payment options</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;