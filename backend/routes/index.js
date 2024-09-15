const express = require('express');
const router = express.Router();
const { Activity, User, GlobalStats } = require('./models');
const { checkJwt, checkRole } = require('./middleware');

// Record a new activity
router.post('/activity', checkJwt, async (req, res) => {
  try {
    const { type, amount, location, mediaUrl } = req.body;
    const user = await User.findOne({ auth0Id: req.user.sub });
    
    const activity = new Activity({
      userId: user._id,
      type,
      amount,
      location,
      mediaUrl
    });

    await activity.save();

    // Update user stats
    user[`total${type.charAt(0).toUpperCase() + type.slice(1)}`] += amount;
    user.experience += amount * 10;
    if (user.experience >= user.level * 100) {
      user.level++;
      user.badges.push(`Level ${user.level} Ocean Guardian`);
    }
    await user.save();

    // Update global stats
    await GlobalStats.findOneAndUpdate({}, {
      $inc: { [`total${type.charAt(0).toUpperCase() + type.slice(1)}`]: amount },
      $set: { lastUpdated: new Date() }
    }, { upsert: true });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Error recording activity' });
  }
});

// Get user dashboard data
router.get('/dashboard', checkJwt, async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.user.sub });
    const activities = await Activity.find({ userId: user._id }).sort('-timestamp').limit(10);
    const globalStats = await GlobalStats.findOne();

    res.json({ user, activities, globalStats });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dashboard data' });
  }
});

// Admin: Get unverified activities
router.get('/admin/unverified', checkJwt, checkRole('admin'), async (req, res) => {
  try {
    const unverifiedActivities = await Activity.find({ verified: false }).populate('userId');
    res.json(unverifiedActivities);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching unverified activities' });
  }
});

// Admin: Verify an activity
router.post('/admin/verify/:activityId', checkJwt, checkRole('admin'), async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    activity.verified = true;
    activity.verifiedBy = req.user.sub;
    await activity.save();

    // Calculate impact
    const impact = calculateImpact(activity.type, activity.amount);
    activity.impact = impact;
    await activity.save();

    // Update ocean health index
    await updateOceanHealthIndex();

    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Error verifying activity' });
  }
});

// Helper function to calculate impact
function calculateImpact(type, amount) {
  let co2Reduced, marineLifeSaved;
  
  if (type === 'wasteCleaned') {
    co2Reduced = amount * 0.5; // Assume 0.5 kg CO2 reduced per kg of waste cleaned
    marineLifeSaved = Math.floor(amount / 10); // Assume 1 marine life saved per 10 kg of waste
  } else if (type === 'treesPlanted') {
    co2Reduced = amount * 20; // Assume 20 kg CO2 absorbed per year per tree
    marineLifeSaved = Math.floor(amount / 5); // Assume 1 marine life saved per 5 trees planted
  }

  return { co2Reduced, marineLifeSaved };
}

// Helper function to update ocean health index
async function updateOceanHealthIndex() {
  const stats = await GlobalStats.findOne();
  const totalActivities = stats.totalWasteCleaned + stats.totalTreesPlanted;
  const healthIndex = Math.min(100, Math.floor((totalActivities / 10000) * 100));
  
  await GlobalStats.findOneAndUpdate({}, { oceanHealthIndex: healthIndex });
}

module.exports = router;