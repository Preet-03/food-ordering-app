import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    password: '', 
    address: '', 
    city: '', 
    state: '', 
    zipCode: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post('/api/users/register', formData);
      login(res.data, res.data.token);
      alert('Registration successful!');
      navigate('/');
    } catch (err) {
      alert('Registration failed: ' + err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image-section register-image">
          <div className="auth-image-overlay">
            <h2>Join Our Community!</h2>
            <p>Create your account and explore thousands of restaurants</p>
            <div className="auth-decorative-icons">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        
        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="auth-header">
              <h2 className="auth-title">Create Account</h2>
              <p className="auth-subtitle">Join us today</p>
            </div>
            
            <form onSubmit={onSubmit} className="auth-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={onChange} 
                    required 
                    className="form-input" 
                    placeholder="Your name" 
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={onChange} 
                    required 
                    className="form-input" 
                    placeholder="Your email" 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={onChange} 
                  required 
                  className="form-input" 
                  placeholder="Password" 
                />
              </div>
              
              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={onChange} 
                  required 
                  className="form-input" 
                  placeholder="Your address" 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={formData.city} 
                    onChange={onChange} 
                    required 
                    className="form-input" 
                    placeholder="City" 
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input 
                    type="text" 
                    name="state" 
                    value={formData.state} 
                    onChange={onChange} 
                    required 
                    className="form-input" 
                    placeholder="State" 
                  />
                </div>
                <div className="form-group">
                  <label>ZIP</label>
                  <input 
                    type="text" 
                    name="zipCode" 
                    value={formData.zipCode} 
                    onChange={onChange} 
                    required 
                    className="form-input" 
                    placeholder="ZIP" 
                  />
                </div>
              </div>
              
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? '' : 'Create Account'}
              </button>
            </form>
            
            <div className="auth-footer">
              <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
