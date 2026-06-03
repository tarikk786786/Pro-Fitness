const { FitnessEvent } = require('../models/Content');
const { asyncHandler, ErrorResponse } = require('../middleware/errorHandler');

exports.getEvents = asyncHandler(async (req, res, next) => {
    const events = await FitnessEvent.find();
    res.status(200).json({ success: true, count: events.length, data: events });
});

exports.getEvent = asyncHandler(async (req, res, next) => {
    const event = await FitnessEvent.findById(req.params.id);
    if (!event) return next(new ErrorResponse('Event not found', 404));
    res.status(200).json({ success: true, data: event });
});

exports.createEvent = asyncHandler(async (req, res, next) => {
    const event = await FitnessEvent.create(req.body);
    res.status(201).json({ success: true, data: event });
});

exports.updateEvent = asyncHandler(async (req, res, next) => {
    const event = await FitnessEvent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) return next(new ErrorResponse('Event not found', 404));
    res.status(200).json({ success: true, data: event });
});

exports.deleteEvent = asyncHandler(async (req, res, next) => {
    const event = await FitnessEvent.findByIdAndDelete(req.params.id);
    if (!event) return next(new ErrorResponse('Event not found', 404));
    res.status(200).json({ success: true, data: {} });
});

exports.registerEvent = asyncHandler(async (req, res, next) => {
    const event = await FitnessEvent.findById(req.params.id);
    if (!event) return next(new ErrorResponse('Event not found', 404));
    
    if (event.registeredUsers.includes(req.user.id)) {
        return next(new ErrorResponse('Already registered', 400));
    }
    
    event.registeredUsers.push(req.user.id);
    await event.save();
    
    res.status(200).json({ success: true, data: event });
});
