const express = require('express');
const router = express.Router();
const HealthConnection = require('../models/HealthConnection');
const HealthMetric = require('../models/HealthMetric');
const User = require('../models/User');

// --- Mock Open Wearables Integration ---

// Calculate the custom PRO FITNESS Health Score (0-100)
function calculateProFitnessHealthScore(sleep, hr, activity) {
  let score = 50; // base score

  // Sleep factor (max 20)
  if (sleep.sleepScore) {
    score += (sleep.sleepScore / 100) * 20;
  } else if (sleep.durationMinutes > 420) { // 7 hours
    score += 15;
  }

  // Recovery / HRV factor (max 15)
  if (hr.hrv > 60) score += 15;
  else if (hr.hrv > 40) score += 10;
  else if (hr.hrv > 20) score += 5;

  // Resting HR factor (max 15) - lower is better (usually)
  if (hr.resting && hr.resting < 60) score += 15;
  else if (hr.resting && hr.resting < 70) score += 10;
  else if (hr.resting && hr.resting < 80) score += 5;

  // Activity factor (max 30)
  if (activity.steps > 10000) score += 15;
  else if (activity.steps > 5000) score += 7;
  
  if (activity.activeMinutes > 60) score += 15;
  else if (activity.activeMinutes > 30) score += 7;

  // Ensure bounds
  return Math.min(Math.max(Math.round(score), 0), 100);
}

// @route   POST /api/health/connect
// @desc    Connect a wearable provider (Mock Open Wearables Oauth)
// @access  Public (Mocked auth)
router.post('/connect', async (req, res) => {
  try {
    const { userId, provider } = req.body;
    
    // Check if exists
    let connection = await HealthConnection.findOne({ userId, provider });
    if (connection) {
      return res.status(400).json({ msg: `${provider} is already connected.` });
    }

    connection = new HealthConnection({
      userId,
      provider,
      accessToken: `mock-token-${Date.now()}`,
      status: 'active',
      lastSync: new Date()
    });

    await connection.save();

    // Trigger an initial mock sync
    await syncMockData(userId);

    res.json({ msg: `Successfully connected ${provider}`, connection });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Mock sync function to populate HealthMetric
async function syncMockData(userId) {
  const date = new Date();
  date.setHours(0,0,0,0);

  // Generate dynamic mock data
  const steps = Math.floor(Math.random() * 8000) + 4000;
  const calories = Math.floor(Math.random() * 1000) + 2000;
  const activeMinutes = Math.floor(Math.random() * 60) + 30;
  const hrv = Math.floor(Math.random() * 40) + 30;
  const restingHR = Math.floor(Math.random() * 20) + 50;
  const sleepDuration = Math.floor(Math.random() * 120) + 360; // 6 to 8 hrs
  const sleepScore = Math.floor(Math.random() * 20) + 70; // 70 to 90

  const activity = { steps, caloriesBurned: calories, activeMinutes, trainingLoad: Math.floor(Math.random() * 50) + 50 };
  const heartRate = { resting: restingHR, hrv, max: 180 };
  const sleep = { durationMinutes: sleepDuration, deepSleepMinutes: 90, remSleepMinutes: 90, sleepScore };
  
  const proFitnessHealthScore = calculateProFitnessHealthScore(sleep, heartRate, activity);
  
  const intelligence = {
    recoveryScore: Math.floor(Math.random() * 20) + 70,
    stressScore: Math.floor(Math.random() * 30) + 20,
    energyScore: Math.floor(Math.random() * 30) + 60,
    proFitnessHealthScore
  };

  const metric = await HealthMetric.findOneAndUpdate(
    { userId, date },
    { activity, heartRate, sleep, intelligence },
    { upsert: true, new: true }
  );
  
  return metric;
}

// @route   POST /api/health/sync
// @desc    Webhook endpoint for Open Wearables to push new data
// @access  Public
router.post('/sync', async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ msg: "User ID required for manual sync" });
  
  const metric = await syncMockData(userId);
  
  // Emit real-time update to connected clients
  const io = req.app.get('io');
  if (io) {
    io.emit(`health_update_${userId}`, metric);
  }
  
  res.json({ msg: "Sync completed.", data: metric });
});

// @route   GET /api/health/metrics/:userId
// @desc    Get user's health metrics
// @access  Public (Mocked auth)
router.get('/metrics/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // For demo purposes, sync latest mock data if empty
    let metrics = await HealthMetric.find({ userId }).sort({ date: -1 }).limit(7);
    if (metrics.length === 0) {
      await syncMockData(userId);
      metrics = await HealthMetric.find({ userId }).sort({ date: -1 }).limit(7);
    }
    
    // Get connections
    const connections = await HealthConnection.find({ userId });

    res.json({
      connections,
      current: metrics[0],
      history: metrics.reverse() // chronological order
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route   GET /api/health/admin/aggregate
// @desc    Get gym-wide health aggregates
// @access  Public (Mock admin)
router.get('/admin/aggregate', async (req, res) => {
  try {
    // In a real app we would aggregate across all users
    const mockAggregate = {
      totalConnected: await HealthConnection.countDocuments(),
      avgHealthScore: 76,
      highOvertrainingRisk: 12,
      avgSleepQuality: 82
    };

    res.json(mockAggregate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
