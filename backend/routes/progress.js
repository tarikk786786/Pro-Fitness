const express = require('express');
const { logProgress, getProgress, getStats, getChartData } = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', logProgress);
router.get('/', getProgress);
router.get('/stats', getStats);
router.get('/chart-data', getChartData);

module.exports = router;
