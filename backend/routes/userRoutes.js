const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/:auth0Id', async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.params.auth0Id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create or update user profile
router.post('/', async (req, res) => {
  try {
    const { auth0Id, name, email } = req.body;
    let user = await User.findOne({ auth0Id });

    if (user) {
      user.name = name;
      user.email = email;
    } else {
      user = new User({ auth0Id, name, email });
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ points: -1 }).limit(10);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;