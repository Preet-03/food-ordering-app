// backend/routes/restaurantRoutes.js
import express from 'express';
const router = express.Router();
import {
  getRestaurants,
  getRestaurantById, // Import the new function
} from '../controllers/restaurantController.js';

router.route('/').get(getRestaurants);
router.route('/:id').get(getRestaurantById); // Add the new route

export default router;