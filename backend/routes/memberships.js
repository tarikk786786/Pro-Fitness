const express = require('express');
const { getPlans, getPlan, subscribe, cancelMembership, getMyMembership } = require('../controllers/membershipController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/plans', getPlans);
router.get('/plans/:id', getPlan);

router.use(protect);
router.post('/subscribe', subscribe);
router.put('/cancel', cancelMembership);
router.get('/my-membership', getMyMembership);

module.exports = router;
