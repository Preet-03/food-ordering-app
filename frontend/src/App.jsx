// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RestaurantListPage from './pages/RestaurantListPage'; // Ensures the correct page is imported
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage'; // 1. Import the CartPage component

function App() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<RestaurantListPage />} /> {/* Ensures the correct page is used for the homepage */}
          <Route path="/cart" element={<CartPage />} /> {/* 2. Add the cart route */}

          <Route path="/restaurants/:id" element={<MenuPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;