import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const user = await userService.registerUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await userService.loginUser(email, password);
      res.json(data);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async assignRole(req: Request, res: Response) {
    try {
      const { userId, role } = req.body;
      const updatedUser = await userService.assignRole(userId, role);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deactivateUser(req: Request, res: Response) {
    try {
      const updatedUser = await userService.deactivateUser(req.params.id);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserBookings(req: Request, res: Response) {
    try {
      const bookings = await userService.getUserBookings(req.params.id);
      res.json(bookings);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserReviews(req: Request, res: Response) {
    try {
      const reviews = await userService.getUserReviews(req.params.id);
      res.json(reviews);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserProfile(req: Request, res: Response) {
    try {
      const user = await userService.getUserProfile(req.params.id);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUserProfile(req: Request, res: Response) {
    try {
      const updatedUser = await userService.updateUserProfile(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
