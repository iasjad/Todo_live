const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('user', 'email')
      .sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

router.post('/', async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ message: 'Task text is required.' });
  }

  try {
    const newTask = await Task.create({
      text: req.body.text,
      user: req.user.id,
    });

    const populatedTask = await Task.findById(newTask._id).populate(
      'user',
      'email'
    );

    req.io.emit('task_created', populatedTask);

    res.status(201).json(populatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    if (req.user.role !== 'admin' && task.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'User not authorized to update this task.' });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('user', 'email');

    req.io.emit('task_updated', updatedTask);
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    if (req.user.role !== 'admin' && task.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'User not authorized to delete this task.' });
    }

    await Task.findByIdAndDelete(req.params.id);

    req.io.emit('task_deleted', req.params.id);
    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
