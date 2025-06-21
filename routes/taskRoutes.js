// server/routes/taskRoutes.js (Updated)
const express = require('express');
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware'); // <--- Import protect middleware

const router = express.Router();

// Apply the 'protect' middleware to all task routes.
// This means a valid JWT is required to access any of these endpoints.
router.route('/')
  .get(protect, getAllTasks)   // GET /api/tasks (protected)
  .post(protect, createTask); // POST /api/tasks (protected)

router.route('/:id')
  .put(protect, updateTask)    // PUT /api/tasks/:id (protected)
  .delete(protect, deleteTask); // DELETE /api/tasks/:id (protected)

module.exports = router;
