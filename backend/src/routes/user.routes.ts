import express from 'express';
import { registerUserController, loginUserController, getUserProfileController, updateUserProfileController, getUserBookingsController, getUserReviewsController, deactivateUserAccountController } from '../controllers/user.controller';

const router = express.Router();

// User registration and login routes
router.post('/register', registerUserController);
router.post('/login', loginUserController);

// User profile routes
router.get('/:userId/profile', getUserProfileController);
router.put('/:userId/profile', updateUserProfileController);

// User bookings and reviews routes
router.get('/:userId/bookings', getUserBookingsController);
router.get('/:userId/reviews', getUserReviewsController);

// Deactivate user account
router.put('/:userId/deactivate', deactivateUserAccountController);

export default router;
