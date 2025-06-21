// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

/**
 * Middleware to protect routes.
 * Verifies the JWT token sent in the Authorization header.
 * If valid, attaches the user (found by ID from token) to the request object (req.user).
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]; // Extract token from "Bearer TOKEN"

      // Verify token using the secret key from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID from the decoded token payload and attach to request
      // Exclude password field for security
      req.user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found.' });
      }

      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  }

  // If no token is provided
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token.' });
  }
};

module.exports = { protect };
