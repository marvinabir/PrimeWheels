import { Router } from 'express';
import { getTicketByBookingIdController, generateTicketController, getAllTicketsInBookingController } from '../controllers/ticket.controlller';

const router = Router();

// Get ticket details by booking ID
router.get('/tickets/:bookingId', getTicketByBookingIdController);

// Generate a new ticket after booking confirmation
router.post('/tickets/:bookingId', generateTicketController);

// Get all tickets in a booking
router.get('/tickets', getAllTicketsInBookingController);

export default router;
