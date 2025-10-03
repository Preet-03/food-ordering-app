// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop component
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import RestaurantListPage from './pages/RestaurantListPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import ProfilePage from './pages/ProfilePage'; // Import ProfilePage

function App() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<RestaurantListPage />} />
          <Route path="/restaurants" element={<RestaurantListPage />} />
          <Route path="/restaurants/:id" element={<MenuPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Protected Routes */}
          <Route path="/shipping" element={<ProtectedRoute><ShippingPage /></ProtectedRoute>} />
          <Route path="/placeorder" element={<ProtectedRoute><PlaceOrderPage /></ProtectedRoute>} />
          <Route path="/order/:id" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </main>
      
      {/* Scroll to Top Button - Available on all pages */}
      <ScrollToTop />
    </div>
  );
}

export default App;