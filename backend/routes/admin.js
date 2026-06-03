const express = require('express');
const { getStats, getUsers, getRevenue, broadcastNotification, getAnalytics } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getStats);
router.get('/users', getUsers);
router.get('/revenue', getRevenue);
router.post('/notifications/broadcast', broadcastNotification);
router.get('/analytics', getAnalytics);

module.exports = router;
