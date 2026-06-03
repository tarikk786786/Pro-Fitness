const express = require('express');
const { getClients, assignWorkout, assignDiet, getSchedule, getClientProgress } = require('../controllers/trainerController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('trainer', 'admin'));

router.get('/clients', getClients);
router.post('/assign-workout', assignWorkout);
router.post('/assign-diet', assignDiet);
router.get('/schedule', getSchedule);
router.get('/client-progress/:userId', getClientProgress);

module.exports = router;
