// frontend/src/pages/RestaurantListPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';
import './RestaurantListPage.css';
import Hero from '../components/Hero';

const RestaurantListPage = () => {
  const [restaurants, setRestaurants] = useState([]); // Initial state is an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get('/api/restaurants');
        
        // This log is crucial for debugging
        console.log('Data received from API:', data);

        // Check if the received data is actually an array
        if (Array.isArray(data)) {
          setRestaurants(data);
        } else {
          // If not an array, set an error and an empty array
          setError('Data received from server is not in the correct format.');
          setRestaurants([]); 
        }

      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to fetch restaurants from the server.');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return <div>Loading restaurants...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Restaurants</h1>
      <Hero />
      <div className="restaurant-list">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))
        ) : (
          <p>No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantListPage;