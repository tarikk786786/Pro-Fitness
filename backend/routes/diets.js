const express = require('express');
const { createDietPlan, getDietPlans, getDietPlan, updateDietPlan, deleteDietPlan } = require('../controllers/dietController');
const { protect, authorize } = require('../middleware/auth');
const { validate, dietSchema } = require('../middleware/validate');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .post(authorize('admin', 'trainer', 'user'), validate(dietSchema), createDietPlan)
  .get(getDietPlans);

router
  .route('/:id')
  .get(getDietPlan)
  .put(updateDietPlan)
  .delete(deleteDietPlan);

module.exports = router;
