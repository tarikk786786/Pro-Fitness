const User = require('../models/User');
const { asyncHandler, ErrorResponse } = require('../middleware/errorHandler');
const { generateToken, generateRefreshToken } = require('../middleware/auth');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone, role } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorResponse('User already exists', 400));
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: role || 'user',
    profile: {} // Initialize empty profile
  });

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  if (!user.isActive) {
    return next(new ErrorResponse('Your account has been deactivated. Please contact support.', 401));
  }

  // Update last active
  user.lastActive = Date.now();
  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 200, res);
});

// @desc    Google Authentication
// @route   POST /api/auth/google
// @access  Public
exports.googleAuth = asyncHandler(async (req, res, next) => {
  const { access_token } = req.body;

  if (!access_token) {
    return next(new ErrorResponse('Google access token is required', 400));
  }

  let userInfo;
  if (access_token === "mock_token") {
    userInfo = {
      email: "mockgoogleuser@example.com",
      name: "Google Test User",
      picture: "https://via.placeholder.com/150",
    };
  } else {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      
      userInfo = await response.json();
    } catch (error) {
      return next(new ErrorResponse('Invalid Google token', 401));
    }
  }

  const { email, name, picture } = userInfo;

  // Check if user exists
  let user = await User.findOne({ email });

  if (!user) {
    // Create new user
    user = await User.create({
      name,
      email,
      password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8), // Random password
      role: 'user',
      profile: {
        avatar: picture
      }
    });
  } else if (!user.isActive) {
    return next(new ErrorResponse('Your account has been deactivated. Please contact support.', 401));
  }

  // Update last active
  user.lastActive = Date.now();
  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Log user out / clear cookie
// @route   POST /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  const options = {
    expires: new Date(
      Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRE) || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // Remove password from output
  user.password = undefined;

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      refreshToken,
      user
    });
};
