import express from 'express';
const router = express.Router();
import { registerUser, loginUser } from '../controllers/userController.js'; // Also add .js extension

// @route   POST /api/users/register
router.post('/register', registerUser);

// @route   POST /api/users/login
router.post('/login', loginUser);

export default router; // Change to export default