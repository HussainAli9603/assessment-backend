// server/server.js (Updated)
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, connectDB } = require('./config/db'); // Import connectDB
const authRoutes = require('./routes/authRoutes');     // <--- Import auth routes
const taskRoutes = require('./routes/taskRoutes');     // Import task routes

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

// Define models (important for Sequelize.sync to find them)
// Sequelize models need to be imported/required so sequelize.sync() can find them
require('./models/User'); 
require('./models/Task'); 

// Connect to the database and sync models
connectDB(); // This calls sequelize.authenticate() and sequelize.sync()

// API Routes
app.use('/api/auth', authRoutes); // <--- Mount auth routes under /api/auth
app.use('/api/tasks', taskRoutes); // Mount task routes under /api/tasks (now protected)

// Basic route for root URL
app.get('/', (req, res) => {
  res.send('To-Do List API is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500; // Custom status code if available
  const message = err.message || 'Something broke!';
  res.status(statusCode).json({ message, error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Auth API at http://localhost:${PORT}/api/auth`);
  console.log(`Tasks API at http://localhost:${PORT}/api/tasks (protected)`);
});
