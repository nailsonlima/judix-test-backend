import Task from '../models/Task.js';

// @desc    Get all tasks for current user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({ status: 'success', data: tasks });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ status: 'error', message: 'Please add a title' });
  }

  try {
    const task = await Task.create({
      title,
      description,
      user: req.user.id,
    });
    res.status(201).json({ status: 'success', data: task });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: 'User not found' });
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ status: 'error', message: 'User not authorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ status: 'success', data: updatedTask });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: 'User not found' });
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ status: 'error', message: 'User not authorized' });
    }

    await task.deleteOne();

    res.status(200).json({ status: 'success', data: { id: req.params.id } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
