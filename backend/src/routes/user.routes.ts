import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/assign-role', userController.assignRole);
router.delete('/:id', userController.deleteUser);
// router.patch('/:id/deactivate', userController.deactivateUser);
router.get('/:id/bookings', userController.getUserBookings);
router.get('/:id/reviews', userController.getUserReviews);
router.get('/:id/profile', userController.getUserProfile);
router.put('/:id/profile', userController.updateUserProfile);
router.get('/', userController.getAllUsers);

export default router;
