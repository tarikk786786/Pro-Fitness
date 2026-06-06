const express = require('express');
const router = express.Router();
const Media = require('../models/Media');
const { syncInstagramMedia } = require('../services/instagramService');

// Get all media (with optional category filter)
router.get('/', async (req, res) => {
  try {
    const { category, type } = req.query;
    const filter = { isActive: true };
    if (category && category !== 'ALL') filter.category = category;
    if (type) filter.type = type;

    const media = await Media.find(filter).sort({ timestamp: -1 });
    res.json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Sync Instagram media using the automated InstagramService
router.post('/sync', async (req, res) => {
  try {
    const updatedCount = await syncInstagramMedia();
    res.json({ success: true, message: 'Instagram media synced and categorized successfully', count: updatedCount });
  } catch (error) {
    console.error('Sync Error:', error);
    res.status(500).json({ success: false, message: 'Failed to sync with Instagram API' });
  }
});

// Update media category or visibility
router.put('/:id', async (req, res) => {
  try {
    const { category, isActive } = req.body;
    const updated = await Media.findByIdAndUpdate(
      req.params.id,
      { $set: { category, isActive } },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update media' });
  }
});

module.exports = router;
