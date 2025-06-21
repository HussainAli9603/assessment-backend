## TaskFlow: A Full-Stack To-Do List Application with Authentication
TaskFlow is a simple yet robust web application that allows users to manage their personal list of tasks. It demonstrates essential CRUD (Create, Read, Update, Delete) operations and implements a basic authentication mechanism to secure user data. The application features a modern, responsive user interface built with React and Tailwind CSS, and a powerful backend powered by Node.js, Express.js, and a MySQL database.

##  Features
 # -> User Authentication:

     User Registration: Create new accounts with a unique username and email.

     User Login: Securely log in with existing credentials.

     JWT-based Authorization: Protect API routes, ensuring users can only access and manage their own tasks.

     Logout functionality.

  # -> Task Management (CRUD):

     Create: Add new tasks to your personal list.

     Read: View all your tasks, with completion status.

     Update: Edit task text and toggle completion status (mark as completed/uncompleted).

     Delete: Remove tasks from your list.

## Responsive User Interface: Clean and intuitive design using Tailwind CSS, ensuring a great experience across various devices.

## Database Persistence: All user and task data is stored securely in a MySQL database.

## Technologies Used
   # Frontend:

    React.js: A JavaScript library for building user interfaces.

    React Router DOM: For declarative routing in the React application.

    Tailwind CSS: A utility-first CSS framework for rapid UI development and responsive design.

    Axios: A promise-based HTTP client for making API requests to the backend.

## Backend:

    Node.js: A JavaScript runtime for server-side development.

    Express.js: A fast, unopinionated, minimalist web framework for Node.js.

    MySQL: A popular open-source relational database management system.

    Sequelize: A powerful Object-Relational Mapper (ORM) for Node.js, making database interactions easier and more robust.

    bcryptjs: Library for hashing and salting passwords to ensure secure storage.

    jsonwebtoken (JWT): For implementing token-based authentication.

     dotenv: To load environment variables from a .env file.

     cors: Node.js middleware for enabling Cross-Origin Resource Sharing.

     nodemon: (Dev Dependency) Automatically restarts the server during development.

## Project Structure
The project is organized into two main directories:

todo-app/
├── client/                 # Frontend React application
│   ├── public/             # Public assets (index.html, favicon, etc.)
│   ├── src/                # React source code
│   │   ├── components/     # Reusable UI components (Navbar, AuthForm, TaskInput, TaskItem, ProtectedRoutes)
│   │   ├── context/        # React Context for global state (AuthContext)
│   │   ├── pages/          # Individual page components (Home, Register, Login, Dashboard)
│   │   ├── services/       # API communication (api.js)
│   │   ├── App.js          # Main React component, handles routing
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Tailwind CSS imports
│   ├── package.json
│   └── tailwind.config.js
└── server/                 # Backend Node.js/Express application
    ├── config/             # Database connection configuration (db.js)
    ├── controllers/        # Business logic for routes (authController.js, taskController.js)
    ├── middleware/         # Custom Express middleware (authMiddleware.js)
    ├── models/             # Sequelize models (User.js, Task.js)
    ├── routes/             # API route definitions (authRoutes.js, taskRoutes.js)
    ├── .env.example        # Example environment variables
    ├── server.js           # Main Express server entry point
    ├── package.json
    └── database.sql        # SQL script for database/table creation

## Prerequisites
   Before you begin, ensure you have the following installed on your system:

   Node.js: v14.x or higher (LTS recommended)

   Download Node.js

   npm (Node Package Manager): Comes bundled with Node.js.

## MySQL Server:

    Download MySQL Community Server

    Ensure your MySQL server is running. You'll need access to a MySQL user (e.g., root) with privileges to create databases and tables.

## Setup Instructions
    Follow these steps to get the application up and running on your local machine.

##   1. Clone the Repository
  git clone <repository_url> # Replace <repository_url> with the actual URL of your project
cd todo-app                 # Navigate into the project directory

##  2. Backend Setup
    Navigate into the server directory:

    cd server

  # a. Install Backend Dependencies
      npm install

# b. Configure Environment Variables
     Create a .env file in the server directory by copying the .env.example file:

cp .env.example .env  # On Linux/macOS

# Or on Windows:
copy .env.example .env

  Open the newly created .env file and update the following variables:

   DB_HOST: Your MySQL host (e.g., localhost)

   DB_USER: Your MySQL username (e.g., root)

   DB_PASSWORD: Your MySQL password

   DB_NAME: A name for your database (e.g., todo_app)

   PORT: The port for the backend server (e.g., 5000)

   JWT_SECRET: A strong, random string for JWT token signing. Generate a complex one!

   Example (for development only): JWT_SECRET=supersecretjwtkeythatisverylongandrandom

   Your .env file should look something like this:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mysecretpassword
DB_NAME=todo_app
PORT=5000
JWT_SECRET=your_extremely_long_and_random_jwt_secret_string_here_123ABC

## c. Database Setup
The backend will automatically create the database and tables if they don't exist, thanks to sequelize.sync(). However, you can also run the database.sql script manually.

## Option 1: 
      -- Rely on sequelize.sync() (Recommended for simplicity)
Simply ensure your MySQL server is running and the credentials in .env are correct. The backend will handle the database and table creation on startup.

## Option 2: 
     -- Manual Database & Table Creation (Optional)
If you prefer to manually create the database and tables, use a MySQL client (like MySQL Workbench, DBeaver, or the mysql command-line client) and run the commands from server/database.sql:

-- Connect to MySQL server
-- Then run these commands:
## CREATE DATABASE IF NOT EXISTS todo_app;
USE todo_app;
-- The tables (users and tasks) will be created by Sequelize on first server run,
-- or you can manually create them using the SQL from database.sql
-- if you prefer to manage schema manually.

d. Run Backend Server
npm run dev # For development (uses nodemon for auto-restart)
# Or
npm start   # For production

The backend server should start on http://localhost:5000 (or your specified PORT) and you'll see messages like "Database connected successfully." and "Server running on port 5000".

3. Frontend Setup
Open a new terminal and navigate into the client directory:

cd ../client

a. Install Frontend Dependencies
npm install

b. Configure Frontend Environment Variables
Create a .env file in the client directory (at todo-app/client/.env):

cp .env.example .env # On Linux/macOS
# Or on Windows:
copy .env.example .env

(Note: Create React App automatically creates an .env.example when ejecting or for certain setups. If it doesn't exist, just create a new .env file.)

Open client/.env and add the backend URL:

## REACT_APP_BACKEND_URL=http://localhost:5000/api

(Ensure the port matches your backend PORT.)

# c. Run Frontend Application
npm start

The frontend application should open in your browser, typically at http://localhost:3000.

## Usage
 -- Once both the backend and frontend servers are running:

 -- Access the Application: Open your web browser and navigate to http://localhost:3000.

 -- Register: Click on "Register" to create a new user account. Provide a unique username, email, and a strong password.

 -- Login: After registration (or if you already have an account), click "Login" and enter your credentials. On successful login, you'll be redirected to the Dashboard.

## Manage Tasks:

  -- Add Task: Use the input field at the top of the Dashboard to type a task and click "Add Task".

  -- View Tasks: All your tasks will be listed below the input field.

  -- Mark Complete/Incomplete: Click the checkbox next to a task to toggle its completion status.

  -- Edit Task: Double-click on a task's text or click the "Edit" button to change its description. Press Enter or click outside the input field to save.

  -- Delete Task: Click the "Delete" button next to a task to remove it permanently.

  -- Logout: Click the "Logout" button in the navigation bar to end your session. You'll be redirected to the login page.

## Authentication Details
  The application uses JSON Web Tokens (JWTs) for authentication:

  Registration/Login: When a user registers or logs in, the backend authenticates their credentials and, if valid, generates a JWT. This token contains the user's ID and is signed with a secret key (JWT_SECRET).

  Token Storage: The frontend receives this JWT and stores it in localStorage.

   Protected Routes: For every subsequent request to a protected API route (e.g., /api/tasks), an Axios interceptor automatically attaches this JWT in the Authorization: Bearer <token> header.

   Backend Verification: The authMiddleware.js on the backend intercepts these requests, verifies the JWT's signature and expiration. If valid, it extracts the user's ID and attaches the user object to the req.user object, allowing task controllers to identify the authenticated user and manage only their tasks.

   Logout: When a user logs out, the JWT is simply removed from localStorage on the client-side, invalidating the session from the frontend's perspective. The token will eventually expire on the backend.

##  Database Schema
The MySQL database (todo_app) contains two main tables:

# users table:

id (VARCHAR): Primary key, UUID for unique user identification.

username (VARCHAR): Unique username for login.

email (VARCHAR): Unique email address, used for login.

password (VARCHAR): Hashed password (using bcrypt).

created_at (DATETIME): Timestamp of user creation.

updated_at (DATETIME): Timestamp of last update.

## tasks table:

id (VARCHAR): Primary key, UUID for unique task identification.

text (VARCHAR): The description of the task.

completed (BOOLEAN): Completion status (0 for false, 1 for true).

user_id (VARCHAR): Foreign key, links the task to its owner in the users table.

created_at (DATETIME): Timestamp of task creation.

updated_at (DATETIME): Timestamp of last update.

## Error Handling
Frontend: Displays user-friendly error messages (e.g., from API responses) for login, registration, and task operations.

Backend: Includes try-catch blocks in controllers to gracefully handle database and server errors. Custom error messages are sent back to the frontend.

Authentication Middleware: Handles invalid or missing tokens by sending 401 Unauthorized responses.
