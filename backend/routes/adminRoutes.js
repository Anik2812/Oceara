const express = require('express');
const router = express.Router();
const { Activity, User, GlobalStats } = require('../models/schemas');
const { checkRole } = require('../middleware/checkRole');

// Get unverified activities
router.get('/unverified', checkRole('admin'), async (req, res) => {
  try {
    const unverifiedActivities = await Activity.find({ verified: false }).populate('userId');
    res.json(unverifiedActivities);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching unverified activities' });
  }
});

// Verify an activity
router.post('/verify/:activityId', checkRole('admin'), async (req, res) => {
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