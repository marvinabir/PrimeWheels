import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller';

const router = Router();
const ticketController = new TicketController();

router.get('/booking/:bookingId', ticketController.getTicketByBookingId);
router.get('/user/:userId', ticketController.getTicketsByUserId);
router.get('/', ticketController.getAllTickets);

export default router;
