import { Router } from 'express';
import {
  getAllEventsController,
  getEventByIdController,
  createEventController,
  updateEventController,
  deleteEventController,
} from '../controllers/event.controller';

const router = Router();

// Get all events
router.get('/', getAllEventsController);

// Get a single event by ID
router.get('/:id', getEventByIdController);

// Create a new event
router.post('/', createEventController);

// Update event information by ID
router.put('/:id', updateEventController);

// Delete an event by ID
router.delete('/:id', deleteEventController);

export default router;
