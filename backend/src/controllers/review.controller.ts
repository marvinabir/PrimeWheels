import { Request, Response } from 'express';
import { getAllReviewsForEvent, addReviewForEvent, updateReview, deleteReview } from '../services/review.service';

// Get all reviews for an event
export const getAllReviewsForEventController = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  try {
    const reviews = await getAllReviewsForEvent(String(eventId));
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Add a review for an event
export const addReviewForEventController = async (req: Request, res: Response) => {
  const { userId, eventId, rating, comment } = req.body;
  try {
    const review = await addReviewForEvent(String(userId), String(eventId), Number(rating), comment);
    res.status(201).json(review);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a review
export const updateReviewController = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  try {
    const updatedReview = await updateReview(String(reviewId), Number(rating), comment);
    res.status(200).json(updatedReview);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a review
export const deleteReviewController = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  try {
    await deleteReview(String(reviewId));
    res.status(204).json({ message: 'Review deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
