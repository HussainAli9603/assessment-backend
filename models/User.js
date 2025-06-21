// server/models/User.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs'); // For password hashing
const { sequelize } = require('../config/db'); // Import the configured sequelize instance

/**
 * Defines the User model with properties for authentication.
 */
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Username must be unique
    validate: {
      len: [3, 30] // Username length between 3 and 30 characters
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Email must be unique
    validate: {
      isEmail: true // Validate email format
    }
  },
  password: {
    type: DataTypes.STRING, // Hashed password will be stored as a string
    allowNull: false
  }
}, {
  tableName: 'users', // Explicitly define the table name
  timestamps: true,   // Enables createdAt and updatedAt fields
  underscored: true,  // Uses snake_case for column names
  hooks: {
    /**
     * Hook to hash the password before a user is created or updated.
     * This runs before saving the user to the database.
     */
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        user.password = await bcrypt.hash(user.password, salt); // Hash the password
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) { // Only re-hash if the password field actually changed
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

/**
 * Method to compare a plain text password with the hashed password stored in the database.
 * @param {string} candidatePassword - The plain text password provided by the user.
 * @returns {Promise<boolean>} True if passwords match, false otherwise.
 */
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
