// server/config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Sequelize with your MySQL connection details
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Database username
  process.env.DB_PASSWORD === undefined ? '' : process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST, // Database host
    port: process.env.DB_PORT,
    dialect: 'mysql',          // Specify MySQL dialect
    logging: false,            // Disable logging SQL queries to console (set to true for debugging)
    define: {
      timestamps: true,        // Enable createdAt and updatedAt fields for models
      underscored: true        // Use snake_case for column names
    },
    pool: {
      max: 5,                  // Maximum number of connection in pool
      min: 0,                  // Minimum number of connection in pool
      acquire: 30000,          // The maximum time, in ms, that pool will try to get connection before throwing error
      idle: 10000              // The maximum time, in ms, a connection can be idle before being released
    }
  }
);


const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    await sequelize.sync();
    console.log('Database models synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
   
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };

