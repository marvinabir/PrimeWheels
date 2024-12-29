import { Request, Response } from 'express';
import { getUserProfile, updateUserProfile, getUserBookings, getUserReviews, deactivateUserAccount, loginUser, registerUser } from '../services/user.service';

// Register new user
export const registerUserController = async (req: Request, res: Response) => {
    const { name, email, password, phone } = req.body;
    try {
      const newUser = await registerUser({ name, email, password, phone });
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
  
// Login user
export const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const { token, user } = await loginUser(email, password);
      res.status(200).json({ token, user });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
}; 

// Get user profile
export const getUserProfileController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await getUserProfile(userId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
export const updateUserProfileController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name, phone, profilePicture } = req.body;
  try {
    const updatedUser = await updateUserProfile(userId, { name, phone, profilePicture });
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all user bookings
export const getUserBookingsController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const bookings = await getUserBookings(userId);
    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all user reviews
export const getUserReviewsController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const reviews = await getUserReviews(userId);
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Deactivate user account
export const deactivateUserAccountController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const deactivatedUser = await deactivateUserAccount(userId);
    res.status(200).json(deactivatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
