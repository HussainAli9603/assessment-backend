// server/controllers/taskController.js (Updated)
const Task = require('../models/Task');
const { Op } = require('sequelize'); // Import Op for operators like AND

/**
 * Get all tasks for the authenticated user.
 * @param {object} req - Express request object (expects req.user from authMiddleware).
 * @param {object} res - Express response object.
 */
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.user.id }, // <--- Filter tasks by authenticated user's ID
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

/**
 * Create a new task for the authenticated user.
 * @param {object} req - Express request object (expects { text: string } and req.user).
 * @param {object} res - Express response object.
 */
exports.createTask = async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === '') {
    return res.status(400).json({ message: 'Task text cannot be empty.' });
  }
  try {
    console.log(req.user.id)
    const newTask = await Task.create({
      text,
      user_id: req.user.id // <--- Assign task to the authenticated user
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

/**
 * Update an existing task for the authenticated user.
 * Ensures the task belongs to the user attempting to update it.
 * @param {object} req - Express request object (expects { id: string } in params, { text?: string, completed?: boolean } in body, and req.user).
 * @param {object} res - Express response object.
 */
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  try {
    // Find task by ID and ensure it belongs to the authenticated user
    const task = await Task.findOne({
      where: {
        id: id,
        user_id: req.user.id // <--- Ensure task belongs to the current user
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized to update.' });
    }

    if (text !== undefined && text.trim() === '') {
      return res.status(400).json({ message: 'Task text cannot be empty.' });
    }
    if (text !== undefined) {
      task.text = text.trim();
    }
    if (completed !== undefined) {
      task.completed = completed;
    }

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

/**
 * Delete a task for the authenticated user.
 * Ensures the task belongs to the user attempting to delete it.
 * @param {object} req - Express request object (expects { id: string } in params and req.user).
 * @param {object} res - Express response object.
 */
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    // Find task by ID and ensure it belongs to the authenticated user
    const task = await Task.findOne({
      where: {
        id: id,
        user_id: req.user.id // <--- Ensure task belongs to the current user
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized to delete.' });
    }

    await task.destroy();
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};
