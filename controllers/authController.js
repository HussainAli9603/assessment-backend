// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

/**
 * Helper function to generate a JWT token.
 * @param {string} id - The user ID to encode in the token.
 * @returns {string} The signed JWT token.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

/**
 * Register a new user.
 * @param {object} req - Express request object (expects { username, email, password }).
 * @param {object} res - Express response object.
 */
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields.' });
  }

  try {
    // Check if user already exists by email or username
    const userExists = await User.findOne({ where: { email } }); // Check by email
    const usernameExists = await User.findOne({ where: { username } }); // Check by username

    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    if (usernameExists) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }

    // Create new user
    const user = await User.create({ username, email, password });

    if (user) {
      res.status(201).json({ // 201 Created
        id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user.id), // Generate and send JWT token
      });
    } else {
      res.status(400).json({ message: 'Invalid user data.' });
    }
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error during registration.', error: error.message });
  }
};

/**
 * Authenticate a user (login).
 * @param {object} req - Express request object (expects { email, password }).
 * @param {object} res - Express response object.
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields.' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    // Check if user exists and password matches
    if (user && (await user.comparePassword(password))) {
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user.id), // Generate and send JWT token
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials.' });
    }
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Server error during login.', error: error.message });
  }
};
