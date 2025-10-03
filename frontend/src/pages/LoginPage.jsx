// frontend/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Use the new hook

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Call the hook to get the login function
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/users/login', formData);
      // Call the login function from context with user data and token
      login(res.data, res.data.token);
      alert('Login successful!');
      navigate('/'); // Redirect to homepage on successful login
    } catch (err) {
      console.error('Login error:', err.response.data.message);
      alert(`Login failed: ${err.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image-section">
          <div className="auth-image-overlay">
            <h2>Welcome Back!</h2>
            <p>Sign in to continue your culinary journey</p>
            <div className="auth-decorative-icons">
              <span>🍕</span>
              <span>🍔</span>
              <span>🍜</span>
              <span>🥗</span>
            </div>
          </div>
        </div>
        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="auth-header">
              <h2 className="auth-title">Sign In</h2>
              <p className="auth-subtitle">Access your account</p>
            </div>
            <form onSubmit={onSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  value={formData.email} 
                  onChange={onChange} 
                  required 
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password"
                  name="password" 
                  value={formData.password} 
                  onChange={onChange} 
                  required 
                  className="form-input"
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? (
                  <span className="loading-spinner">⏳</span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            <div className="auth-footer">
              <p>
                Don't have an account? {' '}
                <Link to="/register" className="auth-link">Create Account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
