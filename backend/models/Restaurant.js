// backend/models/Restaurant.js
import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String, required: true },
  rating: { type: Number, default: 4.0, min: 1, max: 5 },
});

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    address: { type: String, required: true },
    imageUrl: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    menu: [menuSchema],
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;