const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['wasteCleaned', 'treesPlanted'] },
  amount: { type: Number, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  timestamp: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mediaUrl: String,
  impact: {
    co2Reduced: Number,
    marineLifeSaved: Number
  }
});

const userSchema = new mongoose.Schema({
  auth0Id: { type: String, unique: true },
  name: String,
  email: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },
  badges: [String],
  totalWasteCleaned: { type: Number, default: 0 },
  totalTreesPlanted: { type: Number, default: 0 },
  lastActive: Date
});

const globalStatsSchema = new mongoose.Schema({
  totalWasteCleaned: { type: Number, default: 0 },
  totalTreesPlanted: { type: Number, default: 0 },
  oceanHealthIndex: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

activitySchema.index({ location: '2dsphere' });

const Activity = mongoose.model('Activity', activitySchema);
const User = mongoose.model('User', userSchema);
const GlobalStats = mongoose.model('GlobalStats', globalStatsSchema);

module.exports = { Activity, User, GlobalStats };