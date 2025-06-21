-- database.sql (Updated for Users and Tasks relationship)

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS assessment;

-- Use the newly created database
USE assessment;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY, -- UUID will be stored as VARCHAR
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- To store hashed password
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the tasks table (with userId foreign key)
CREATE TABLE IF NOT EXISTS tasks (
    id VARCHAR(255) PRIMARY KEY, -- UUID will be stored as VARCHAR
    text VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    user_id VARCHAR(255) NOT NULL, -- Foreign key to users table
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- Define the foreign key constraint
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Optional: You can insert sample data after creating tables if needed, but remember passwords need to be hashed.
-- INSERT INTO users (id, username, email, password) VALUES
-- ('user1_uuid_here', 'testuser', 'test@example.com', '$2a$10$YOUR_HASHED_PASSWORD_HERE');
-- INSERT INTO tasks (id, text, completed, user_id) VALUES
-- ('taskA_uuid_here', 'Buy groceries', FALSE, 'user1_uuid_here');
