/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

// Edit Profile Modal Component
const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate passwords if changing password
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setError('New passwords do not match');
          setLoading(false);
          return;
        }
        if (!formData.currentPassword) {
          setError('Current password is required to change password');
          setLoading(false);
          return;
        }
      }

      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };

      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      await onSave(updateData);
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Profile</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div> */}
          <div className="form-group">
            <label>Current Password (required to change password)</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>New Password (leave empty to keep current)</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Manage Addresses Modal Component
const ManageAddressesModal = ({ isOpen, onClose, addresses, onSave, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: 'home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  });
  const [saveError, setSaveError] = useState('');

  const handleAddNew = () => {
    setEditingAddress(null);
    setFormData({
      type: 'home',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false
    });
    setShowAddForm(true);
  };

  const handleEdit = (address) => {
    console.log('handleEdit address:', address);
    setEditingAddress(address);
    setFormData({
      type: address.type,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      isDefault: address.isDefault
    });
    setShowAddForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError('');
    try {
      const idToUse = editingAddress && (editingAddress._id || editingAddress.id || editingAddress);
      console.log('Submitting address, id:', idToUse, 'data:', formData);
      if (idToUse) {
        await onSave(idToUse, formData);
      } else {
        await onSave(null, formData);
      }
      setShowAddForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error('Failed to save address:', error);
      setSaveError(error.response?.data?.message || error.message || 'Failed to save address');
    }
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await onDelete(addressId);
      } catch (error) {
        console.error('Failed to delete address:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content large">
        <div className="modal-header">
          <h3>Manage Addresses</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {!showAddForm ? (
          <div>
            <div className="modal-actions" style={{ marginBottom: '20px' }}>
              <button className="btn-primary" onClick={handleAddNew}>
                Add New Address
              </button>
            </div>

            <div className="addresses-list">
              {addresses.length === 0 ? (
                <p>No addresses saved yet.</p>
              ) : (
                addresses.map((address) => (
                  <div key={address._id} className="address-item">
                    <div className="address-info">
                      <div className="address-type">
                        {address.type.toUpperCase()}
                        {address.isDefault && <span className="default-badge">Default</span>}
                      </div>
                      <div className="address-details">
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.zipCode}</p>
                      </div>
                    </div>
                    <div className="address-actions">
                      <button
                        className="btn-secondary"
                        onClick={() => handleEdit(address)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(address._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Address Type</label>
              <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                  />
                  Set as Default
                </label>
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingAddress ? 'Update Address' : 'Add Address'}
              </button>
            </div>
            {saveError && <div className="error-message">{saveError}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

// Manage Payments Modal Component
const ManagePaymentsModal = ({ isOpen, onClose, paymentMethods, onSave, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [formData, setFormData] = useState({
    type: 'credit_card',
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    bankName: '',
    accountNumber: '',
    isDefault: false
  });

  const handleAddNew = () => {
    setEditingMethod(null);
    setFormData({
      type: 'credit_card',
      cardNumber: '',
      cardHolderName: '',
      expiryDate: '',
      cvv: '',
      upiId: '',
      bankName: '',
      accountNumber: '',
      isDefault: false
    });
    setShowAddForm(true);
  };

  const handleEdit = (method) => {
    setEditingMethod(method);
    setFormData({
      type: method.type,
      cardNumber: method.cardNumber || '',
      cardHolderName: method.cardHolderName || '',
      expiryDate: method.expiryDate || '',
      cvv: method.cvv || '',
      upiId: method.upiId || '',
      bankName: method.bankName || '',
      accountNumber: method.accountNumber || '',
      isDefault: method.isDefault
    });
    setShowAddForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMethod) {
        await onSave(editingMethod._id, formData);
      } else {
        await onSave(null, formData);
      }
      setShowAddForm(false);
      setEditingMethod(null);
    } catch (error) {
      console.error('Failed to save payment method:', error);
    }
  };

  const handleDelete = async (methodId) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      try {
        await onDelete(methodId);
      } catch (error) {
        console.error('Failed to delete payment method:', error);
      }
    }
  };

  const maskCardNumber = (number) => {
    if (!number) return '';
    return '**** **** **** ' + number.slice(-4);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content large">
        <div className="modal-header">
          <h3>Manage Payment Methods</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {!showAddForm ? (
          <div>
            <div className="modal-actions" style={{ marginBottom: '20px' }}>
              <button className="btn-primary" onClick={handleAddNew}>
                Add New Payment Method
              </button>
            </div>

            <div className="payment-methods-list">
              {paymentMethods.length === 0 ? (
                <p>No payment methods saved yet.</p>
              ) : (
                paymentMethods.map((method) => (
                  <div key={method._id} className="payment-method-item">
                    <div className="payment-method-info">
                      <div className="payment-type">
                        {method.type.replace('_', ' ').toUpperCase()}
                        {method.isDefault && <span className="default-badge">Default</span>}
                      </div>
                      <div className="payment-details">
                        {method.type === 'credit_card' || method.type === 'debit_card' ? (
                          <p>{maskCardNumber(method.cardNumber)} - {method.cardHolderName}</p>
                        ) : method.type === 'upi' ? (
                          <p>UPI ID: {method.upiId}</p>
                        ) : (
                          <p>{method.bankName} - {method.accountNumber}</p>
                        )}
                      </div>
                    </div>
                    <div className="payment-method-actions">
                      <button
                        className="btn-secondary"
                        onClick={() => handleEdit(method)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(method._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Payment Type</label>
              <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="upi">UPI</option>
                <option value="net_banking">Net Banking</option>
              </select>
            </div>

            {(formData.type === 'credit_card' || formData.type === 'debit_card') && (
              <>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Card Holder Name</label>
                  <input
                    type="text"
                    name="cardHolderName"
                    value={formData.cardHolderName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {formData.type === 'upi' && (
              <div className="form-group">
                <label>UPI ID</label>
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleChange}
                  placeholder="username@paytm"
                  required
                />
              </div>
            )}

            {formData.type === 'net_banking' && (
              <>
                <div className="form-group">
                  <label>Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                />
                Set as Default
              </label>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingMethod ? 'Update Payment Method' : 'Add Payment Method'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [userProfile, setUserProfile] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showManageAddresses, setShowManageAddresses] = useState(false);
  const [showManagePayments, setShowManagePayments] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders/myorders');
        console.log('Fetched orders:', data);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('/api/users/profile');
        // Ensure addresses array exists for older responses that returned top-level address/city
        if ((!data.addresses || data.addresses.length === 0) && (data.address || data.city)) {
          data.addresses = [{
            _id: 'synthetic',
            type: 'home',
            street: data.address || '',
            city: data.city || '',
            state: data.state || '',
            zipCode: data.zipCode || '',
            isDefault: true,
          }];
        }
        setUserProfile(data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    if (user) {
      fetchOrders();
      fetchUserProfile();
    }
  }, [user]);

  const getOrderStatus = (order) => {
    if (order.isDelivered) return { text: 'Delivered', class: 'status-delivered' };
    if (order.isPaid) return { text: 'Preparing', class: 'status-preparing' };
    return { text: 'Pending', class: 'status-pending' };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // API Functions
  const updateProfile = async (profileData) => {
    const { data } = await axios.put('/api/users/profile', profileData);
    setUserProfile(data);
    return data;
  };

  const addAddress = async (addressData) => {
    try {
      const { data } = await axios.post('/api/users/addresses', addressData);
      setUserProfile(prev => ({
        ...prev,
        addresses: data
      }));
      console.log('addAddress succeeded', data);
      return data;
    } catch (error) {
      console.error('addAddress error', error.response?.data || error.message);
      throw error;
    }
  };

  const updateAddress = async (addressId, addressData) => {
    try {
      const { data } = await axios.put(`/api/users/addresses/${addressId}`, addressData);
      setUserProfile(prev => ({
        ...prev,
        addresses: data
      }));
      console.log('updateAddress succeeded', data);
      return data;
    } catch (error) {
      console.error('updateAddress error', error.response?.data || error.message);
      throw error;
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const { data } = await axios.delete(`/api/users/addresses/${addressId}`);
      setUserProfile(prev => ({
        ...prev,
        addresses: data
      }));
      console.log('deleteAddress succeeded', data);
      return data;
    } catch (error) {
      console.error('deleteAddress error', error.response?.data || error.message);
      throw error;
    }
  };

  // Wrapper so modal can call the same onSave for add (id null) and update (id present)
  const saveAddress = async (addressId, addressData) => {
    if (addressId) {
      return updateAddress(addressId, addressData);
    } else {
      return addAddress(addressData);
    }
  };

  const addPaymentMethod = async (paymentData) => {
    const { data } = await axios.post('/api/users/payment-methods', paymentData);
    setUserProfile(prev => ({
      ...prev,
      paymentMethods: data
    }));
  };

  const updatePaymentMethod = async (methodId, paymentData) => {
    const { data } = await axios.put(`/api/users/payment-methods/${methodId}`, paymentData);
    setUserProfile(prev => ({
      ...prev,
      paymentMethods: data
    }));
  };

  const deletePaymentMethod = async (methodId) => {
    const { data } = await axios.delete(`/api/users/payment-methods/${methodId}`);
    setUserProfile(prev => ({
      ...prev,
      paymentMethods: data
    }));
  };

  // Event Handlers
  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleManageAddresses = () => {
    setShowManageAddresses(true);
  };

  const handleManagePayments = () => {
    setShowManagePayments(true);
  };

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-details">
              <h1>Welcome back, {user?.name || 'User'}!</h1>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{orders.length}</span>
              <span className="stat-label">Total Orders</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                ₹{orders.reduce((total, order) => total + order.totalPrice, 0)}
              </span>
              <span className="stat-label">Total Spent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-nav">
        <button 
          className={`nav-tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Order History
        </button>
        {/* <button 
          className={`nav-tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        > 
          Favorites
        </button>*/}
        <button 
          className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {/* Content Section */}
      <div className="profile-content">
        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Your Order History</h2>
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading your delicious history...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🍽️</div>
                <h3>No orders yet!</h3>
                <p>Ready to taste something amazing?</p>
                <a href="/" className="cta-button">Start Ordering</a>
              </div>
            ) : (
              <div className="orders-grid">
                {orders.map(order => {
                  const status = getOrderStatus(order);
                  return (
                    <div key={order._id} className="order-card">
                      <div className="order-header">
                        <div className="order-date">
                          {formatDate(order.createdAt)}
                        </div>
                        {/* <span className={`order-status ${status.class}`}>
                          {status.text}
                        </span> */}
                      </div>
                      
                      <div className="order-summary">
                        <div className="order-total">
                          <span className="total-label">Total Amount</span>
                          <span className="total-amount">₹{order.totalPrice}</span>
                        </div>
                        <div className="order-items-count">
                          {order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}
                        </div>
                      </div>

                      <div className="order-items">
                        <h4>Order Items:</h4>
                        <div className="items-list">
                          {order.orderItems.map((item, index) => (
                            <div key={index} className="order-item">
                              <div className="item-image">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} />
                                ) : (
                                  <div className="item-placeholder">🍽️</div>
                                )}
                              </div>
                              <div className="item-details">
                                <h5>{item.name}</h5>
                                <div className="item-info">
                                  <span>Qty: {item.qty}</span>
                                  <span>₹{item.price}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* <div className="order-actions">
                        <button className="action-btn secondary">View Details</button>
                        <button className="action-btn primary">Reorder</button>
                      </div> */}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="favorites-section">
            <h2>Your Favorites</h2>
            <div className="empty-state">
              <div className="empty-icon">❤️</div>
              <h3>No favorites yet!</h3>
              <p>Start adding your favorite dishes to see them here.</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <h2>Account Settings</h2>
            <div className="settings-grid">
              <div className="setting-item">
                <h4>Personal Information</h4>
                <p>Update your name, email, and phone number</p>
                <button className="action-btn secondary" onClick={handleEditProfile}>Edit Profile</button>
              </div>
              <div className="setting-item">
                <h4>Delivery Addresses</h4>
                <p>Manage your saved addresses</p>
                <button className="action-btn secondary" onClick={handleManageAddresses}>Manage Addresses</button>
              </div>
              <div className="setting-item">
                <h4>Payment Methods</h4>
                <p>Add or remove payment options</p>
                <button className="action-btn secondary" onClick={handleManagePayments}>Manage Payments</button>
              </div>
              {/* <div className="setting-item">
                <h4>Notifications</h4>
                <p>Control your notification preferences</p>
                <button className="action-btn secondary">Notification Settings</button>
              </div> */}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        user={userProfile}
        onSave={updateProfile}
      />

      <ManageAddressesModal
        isOpen={showManageAddresses}
        onClose={() => setShowManageAddresses(false)}
        addresses={userProfile?.addresses || []}
        onSave={saveAddress}
        onDelete={deleteAddress}
      />

      <ManagePaymentsModal
        isOpen={showManagePayments}
        onClose={() => setShowManagePayments(false)}
        paymentMethods={userProfile?.paymentMethods || []}
        onSave={updatePaymentMethod}
        onDelete={deletePaymentMethod}
      />
    </div>
  );
};

export default ProfilePage;