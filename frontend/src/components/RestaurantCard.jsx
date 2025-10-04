// frontend/src/components/RestaurantCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurants/${restaurant._id}`} className="card-link"> {/* Add Link */}
      <div className="card">
        <img src={restaurant.imageUrl} alt={restaurant.name} className="card-img" />
        <div className="card-body">
          <h3 className="card-title">{restaurant.name}</h3>
          <p className="card-text">{restaurant.cuisine}</p>
          <p className="card-text">{restaurant.rating} ⭐</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;