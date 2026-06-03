const express = require('express');
const { getEvents, getEvent, createEvent, updateEvent, deleteEvent, registerEvent } = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth');
const { validate, eventSchema } = require('../middleware/validate');

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEvent);

router.use(protect);
router.post('/:id/register', registerEvent);

router.use(authorize('admin'));
router.post('/', validate(eventSchema), createEvent);
router.put('/:id', validate(eventSchema), updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
