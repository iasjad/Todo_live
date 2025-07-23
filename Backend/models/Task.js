const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Task text is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in progress', 'completed'],
      default: 'pending',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', TaskSchema);
