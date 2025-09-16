// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // Import it
import './index.css';
import { CartProvider } from './context/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Wrap App with the provider */}
        <CartProvider> {/* 2. This provider MUST wrap the App component */}
          <App />
        </CartProvider>

      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);