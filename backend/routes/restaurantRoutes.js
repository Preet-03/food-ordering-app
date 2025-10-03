// backend/routes/restaurantRoutes.js
import express from 'express';
const router = express.Router();
import {
  getRestaurants,
  getRestaurantById,
  searchRestaurants,
  getAllProducts,
  getSortedMenuItems,
} from '../controllers/restaurantController.js';

router.route('/').get(getRestaurants);
router.route('/search').get(searchRestaurants);
router.route('/products').get(getAllProducts);
router.route('/menu-items/sorted').get(getSortedMenuItems);
router.route('/:id').get(getRestaurantById);

export default router;