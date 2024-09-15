const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const User = require('../models/User');

// Record a new activity
router.post('/', async (req, res) => {
  try {
    const { userId, type, amount } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const activity = new Activity({ user: userId, type, amount });
    await activity.save();

    // Update user stats
    if (type === 'wasteCleaned') {
      user.wasteCleaned += amount;
      user.points += amount * 10; // 10 points per kg of waste cleaned
    } else if (type === 'treesPlanted') {
      user.treesPlanted += amount;
      user.points += amount * 50; // 50 points per tree planted
    }

    await user.save();

    res.json({ activity, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user activities
router.get('/user/:userId', async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.params.userId }).sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;