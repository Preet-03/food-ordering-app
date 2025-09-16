// src/pages/LoginPage.jsx

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext); // Get the login function from context
  const navigate = useNavigate(); // Hook for redirection

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      // Call the login function from context with user data and token
      login(res.data, res.data.token);
      alert('Login successful!');
      navigate('/'); // Redirect to homepage on successful login
    } catch (err) {
      console.error('Login error:', err.response.data.message);
      alert(`Login failed: ${err.response.data.message}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={onChange} required />
        </div>
        <div>
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={onChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;