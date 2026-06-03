const express = require('express');
const { createWorkoutPlan, getWorkoutPlans, getWorkoutPlan, updateWorkoutPlan, deleteWorkoutPlan } = require('../controllers/workoutController');
const { protect, authorize } = require('../middleware/auth');
const { validate, workoutSchema } = require('../middleware/validate');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .post(authorize('admin', 'trainer', 'user'), validate(workoutSchema), createWorkoutPlan)
  .get(getWorkoutPlans);

router
  .route('/:id')
  .get(getWorkoutPlan)
  .put(updateWorkoutPlan)
  .delete(deleteWorkoutPlan);

module.exports = router;
