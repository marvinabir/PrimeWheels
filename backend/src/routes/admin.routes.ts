import { Router } from 'express';
import { getAllUsersController, getUserByIdController, activateUserController, deactivateUserController, getAllPaymentsController, registerAdminController } from '../controllers/admin.controller';
import { getAllBookingsController } from '../controllers/booking.controller';

const router = Router();

// Register admin
router.post('/admin/register', registerAdminController);


// Get all users
router.get('/admin/users', getAllUsersController);

// Get details of a specific user
router.get('/admin/users/:userId', getUserByIdController);

// Activate a user
router.put('/admin/users/:userId/activate', activateUserController);

// Deactivate a user
router.put('/admin/users/:userId/deactivate', deactivateUserController);

// View all bookings
router.get('/admin/bookings', getAllBookingsController);

// View all payment statuses
router.get('/admin/payments', getAllPaymentsController);

export default router;
