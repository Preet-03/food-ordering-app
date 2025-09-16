// frontend/src/components/Navbar.jsx

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">FoodApp</Link>
      <div className="navbar-links">
        <Link to="/cart">Cart ({cartItemCount})</Link> 
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;