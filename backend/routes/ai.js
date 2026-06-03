const express = require('express');
const { getRecommendation, chatWithCoach, analyzeBody } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/recommend', getRecommendation);
router.post('/chat', chatWithCoach);
router.post('/analyze-body', analyzeBody);

module.exports = router;
