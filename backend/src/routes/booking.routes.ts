import express from 'express';
import * as bookingController from '../controllers/booking.controller';

const router = express.Router();

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.put('/:id/status', bookingController.updateBookingStatus);
router.patch('/:id/cancel', bookingController.cancelBooking);
router.patch('/car/:carId/status', bookingController.updateCarStatus);

export default router;
