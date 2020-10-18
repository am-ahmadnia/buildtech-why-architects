const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ['admin', 'designer', 'leadDesigner', 'manager', 'client'],
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      min: 6,
      max: 22,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    nationalCode: {
      type: Number,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', schema);
module.exports = User;
