import { Request, Response } from 'express';
import { ReviewService } from '../services/review.service';

const reviewService = new ReviewService();

export class ReviewController {
  async addReview(req: Request, res: Response) {
    try {
      const { userId, carId, content, rating } = req.body;
      const review = await reviewService.addReview({ userId, carId, content, rating });
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllReviews(req: Request, res: Response) {
    try {
      const reviews = await reviewService.getAllReviews();
      res.json(reviews);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getReviewById(req: Request, res: Response) {
    try {
      const review = await reviewService.getReviewById(req.params.id);
      res.json(review);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getReviewsByCar(req: Request, res: Response) {
    try {
      const reviews = await reviewService.getReviewsByCar(req.params.carId);
      res.json(reviews);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getReviewsByUser(req: Request, res: Response) {
    try {
      const reviews = await reviewService.getReviewsByUser(req.params.userId);
      res.json(reviews);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteReview(req: Request, res: Response) {
    try {
      await reviewService.deleteReview(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
