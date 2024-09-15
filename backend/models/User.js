const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  wasteCleaned: {
    type: Number,
    default: 0,
  },
  treesPlanted: {
    type: Number,
    default: 0,
  },
});

// Use mongoose.models to avoid overwriting
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
