const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const { Activity, User, OceanHealth } = require('./models/schemas');

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

app.get('/api/user', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub;
    let user = await User.findOne({ auth0Id });
    if (!user) {
      user = new User({
        auth0Id,
        name: req.auth.payload.name,
        email: req.auth.payload.email
      });
      await user.save();
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});

app.post('/api/activity', checkJwt, async (req, res) => {
  try {
    const { type, amount } = req.body;
    const auth0Id = req.auth.payload.sub;
    
    const user = await User.findOne({ auth0Id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const activity = new Activity({
      userId: user._id,
      type,
      amount
    });
    await activity.save();

    if (type === 'wasteCleaned') {
      user.wasteCleaned += amount;
    } else if (type === 'treesPlanted') {
      user.treesPlanted += amount;
    }
    await user.save();

    // Update Ocean Health Index
    let oceanHealth = await OceanHealth.findOne().sort({ date: -1 });
    if (!oceanHealth) {
      oceanHealth = new OceanHealth();
    }
    if (type === 'wasteCleaned') {
      oceanHealth.totalWasteCleaned += amount;
    } else if (type === 'treesPlanted') {
      oceanHealth.totalTreesPlanted += amount;
    }
    oceanHealth.healthIndex = (oceanHealth.totalWasteCleaned * 0.7 + oceanHealth.totalTreesPlanted * 0.3) / 100;
    await oceanHealth.save();

    res.json({ message: 'Activity recorded successfully', user, oceanHealth });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while recording the activity' });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboard = await User.find({})
      .sort({ wasteCleaned: -1, treesPlanted: -1 })
      .limit(10)
      .select('name wasteCleaned treesPlanted');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the leaderboard' });
  }
});

app.get('/api/ocean-health', async (req, res) => {
  try {
    const oceanHealth = await OceanHealth.findOne().sort({ date: -1 });
    res.json(oceanHealth);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching ocean health data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));