import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// Public routes
// @route   POST /api/users/register
router.post('/register', registerUser);

// @route   POST /api/users/login
router.post('/login', loginUser);

// Protected routes
// @route   GET /api/users/profile
router.get('/profile', protect, getProfile);

// @route   PUT /api/users/profile
router.put('/profile', protect, updateProfile);

// @route   POST /api/users/addresses
router.post('/addresses', protect, addAddress);

// @route   PUT /api/users/addresses/:id
router.put('/addresses/:id', protect, updateAddress);

// @route   DELETE /api/users/addresses/:id
router.delete('/addresses/:id', protect, deleteAddress);

// @route   POST /api/users/payment-methods
router.post('/payment-methods', protect, addPaymentMethod);

// @route   PUT /api/users/payment-methods/:id
router.put('/payment-methods/:id', protect, updatePaymentMethod);

// @route   DELETE /api/users/payment-methods/:id
router.delete('/payment-methods/:id', protect, deletePaymentMethod);

export default router;
