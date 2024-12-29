import { Router } from 'express';
import { getAllReviewsForEventController, addReviewForEventController, updateReviewController, deleteReviewController } from '../controllers/review.controller';


const router = Router();

// Get all reviews for an event
router.get('/reviews/:eventId', getAllReviewsForEventController);

// Add a review for an event
router.post('/reviews', addReviewForEventController);

// Update a review
router.put('/reviews/:reviewId', updateReviewController);

// Delete a review
router.delete('/reviews/:reviewId', deleteReviewController);

export default router;
