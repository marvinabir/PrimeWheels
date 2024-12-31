import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';

const router = Router();
const reviewController = new ReviewController();

router.post('/', reviewController.addReview);
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.get('/car/:carId', reviewController.getReviewsByCar);
router.get('/user/:userId', reviewController.getReviewsByUser);
router.delete('/:id', reviewController.deleteReview);

export default router;
