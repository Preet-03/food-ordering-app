import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Import Routes
import userRoutes from './routes/userRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Allow the server to accept JSON in the request body

// --- API Routes ---
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);

// A simple test route for the root URL
app.get('/', (req, res) => {
  res.send('API is up and running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));