const express = require('express');
const router = express.Router();

// Mock data for ocean health indicators
const oceanHealthData = {
  plasticPollution: 8.5, // million metric tons per year
  coralReefHealth: 65, // percentage of healthy reefs
  marineSpeciesAtRisk: 2270, // number of species
  oceanAcidification: 8.1, // pH level
  seaLevelRise: 3.4, // mm per year
};

// Get ocean health data
router.get('/', (req, res) => {
  res.json(oceanHealthData);
});

// Update ocean health data (for admin purposes, you may want to add authentication here)
router.post('/update', (req, res) => {
  const { indicator, value } = req.body;
  if (oceanHealthData.hasOwnProperty(indicator)) {
    oceanHealthData[indicator] = value;
    res.json({ message: 'Ocean health data updated successfully', data: oceanHealthData });
  } else {
    res.status(400).json({ message: 'Invalid indicator' });
  }
});

module.exports = router;