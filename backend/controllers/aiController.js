const { asyncHandler } = require('../middleware/errorHandler');
const aiService = require('../services/aiService');

// @desc    Generate AI Recommendation (Workout + Diet)
// @route   POST /api/ai/recommend
// @access  Private
exports.getRecommendation = asyncHandler(async (req, res, next) => {
    const recommendation = await aiService.generateRecommendation(req.body);
    res.status(200).json({ success: true, data: recommendation });
});

// @desc    Chat with AI Coach
// @route   POST /api/ai/chat
// @access  Private
exports.chatWithCoach = asyncHandler(async (req, res, next) => {
    const { message, history } = req.body;
    const response = await aiService.chatWithCoach(message, history);
    res.status(200).json({ success: true, data: response });
});

// @desc    Analyze Body (Placeholder)
// @route   POST /api/ai/analyze-body
// @access  Private
exports.analyzeBody = asyncHandler(async (req, res, next) => {
    const response = await aiService.analyzeBody(req.body);
    res.status(200).json({ success: true, data: response });
});
