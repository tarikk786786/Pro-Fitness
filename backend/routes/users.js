const express = require('express');
const { getUsers, getUser, updateUser, deleteUser, updateProfile } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const { validate, updateProfileSchema } = require('../middleware/validate');

const router = express.Router();

// Apply protect middleware to all routes in this file
router.use(protect);

router.put('/:id/profile', validate(updateProfileSchema), updateProfile);

// Admin only routes
router.use(authorize('admin'));

router
  .route('/')
  .get(getUsers);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
