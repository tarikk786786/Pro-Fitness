const express = require('express');
const router = express.Router();
const whatsappService = require('../services/whatsappService');
const { protect, authorize } = require('../middleware/auth'); // assuming standard auth middleware exists

// Note: Ensure admin only for these routes
router.use(protect);
router.use(authorize('admin'));

// GET /api/whatsapp/qr
router.get('/qr', (req, res) => {
  const status = whatsappService.getStatus();
  const qr = whatsappService.getQR();
  
  res.json({ status, qr });
});

// GET /api/whatsapp/status
router.get('/status', (req, res) => {
  const status = whatsappService.getStatus();
  res.json({ status });
});

// POST /api/whatsapp/send
router.post('/send', async (req, res) => {
  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({ success: false, message: 'Phone and message are required' });
  }

  try {
    await whatsappService.sendMessage(phone, message);
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
