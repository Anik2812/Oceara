const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['wasteCleaned', 'treesPlanted'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists before defining it
const Activity = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);

module.exports = Activity;
