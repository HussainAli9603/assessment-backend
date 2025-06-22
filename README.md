
# Task Manager API

A secure, token-based task management system where users can register, log in, and manage their personal tasks using a RESTful API.

## 🚀 Features

- ✅ JWT Authentication (Register & Login)
- ✅ Secure password handling
- ✅ CRUD operations for tasks
- ✅ Each user accesses only their own tasks
- ✅ Sequelize ORM with MySQL
- ✅ Modular controllers and models

## 🛠️ Tech Stack

- **Backend**:   Node.js, Express.js
- **Database**:  MySQL with Sequelize ORM
- **Auth**:      JWT (jsonwebtoken)
- **Dev Tools**: Nodemon, dotenv
- **Frontend**:  (Optional) React + Vite (deploy via Vercel)

## 📁 Project Structure

project-root/
├── server/
│   ├── config/           # Sequelize DB config
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/       # JWT Auth middleware
│   ├── models/           # Sequelize models (User, Task)
│   ├── routes/           # Route definitions
│   └── index.js          # Entry point
└── .env                  # Environment variables


## API: Auth Routes

### ✅ Register

**POST** `/api/auth/register`

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure123"
}

```

### ✅ Login

**POST** `/api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "secure123"
}
```

**Returns:**

```json
{
  "id": "user_id",
  "username": "john_doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

> Use this token in future requests:
> `Authorization: Bearer <token>`

---

## 📋 API: Task Routes (Requires Auth)

### 📄 Get All Tasks

**GET** `/api/tasks/`

### ➕ Create Task

**POST** `/api/tasks/`

```json
{
  "text": "Finish homework"
}
```

### 🖊️ Update Task

**PUT** `/api/tasks/:id`

```json
{
  "text": "Finish homework now",
  "completed": true
}
```

### ❌ Delete Task

**DELETE** `/api/tasks/:id`

---

## ⚙️ .env Example

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=assessment
JWT_SECRET=your_jwt_secret
```

---

## ▶️ Run Project Locally

1. Clone the repo and navigate to project directory.

2. Install dependencies:

```bash
npm install
```

3. Setup your `.env` file with DB and JWT details.

4. Start the server:

```bash
npm run dev
```

---

## ⚠️ Important Notes

* Make sure MySQL is running and database `assessment` exists.
* Ensure `User` model has a `comparePassword` method using bcrypt.
* Frontend (optional) can use React + Vite and deployed via Vercel.

---

## 📝 License

MIT © 2025 Hussain Ali

```

Would you like me to save this to a file or help you upload it to GitHub?
```
