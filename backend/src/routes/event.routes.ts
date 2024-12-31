import { Router } from 'express';
import { EventController } from '../controllers/event.controller';

const router = Router();
const eventController = new EventController();

router.post('/', eventController.addEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);
router.get('/:id', eventController.getEvent);
router.get('/', eventController.getAllEvents);

export default router;
