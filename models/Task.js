const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    progressUntilToday: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    todaysProgress: {
      type: Number,
      default: 0,
    },
    hoursSpent: {
      type: Number,
      default: 0,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', schema);
module.exports = Task;
