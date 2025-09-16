// backend/seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js'; // (You can create this file if you want sample users too)
import restaurants from './data/restaurants.js';
import User from './models/User.js';
import Restaurant from './models/Restaurant.js';
import connectDB from './config/db.js'; // include the .js extension!

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Restaurant.deleteMany();
    // await User.deleteMany(); // Uncomment if you add sample users

    await Restaurant.insertMany(restaurants);
    // await User.insertMany(users);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

// To run this script, we'll add a command to package.json
// It checks for a command line argument "-d" to destroy data if needed
importData();