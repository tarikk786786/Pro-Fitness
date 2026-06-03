const express = require('express');
const { register, login, getMe, logout, googleAuth } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validate, registerSchema, loginSchema } = require('../middleware/validate');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/google', googleAuth);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

module.exports = router;
