import { Request, Response } from 'express';
import { getAllUsers, getUserById, activateUser, deactivateUser, getAllPayments, registerAdmin } from '../services/admin.service';
import { getAllBookings } from '../services/booking.service';

export const registerAdminController = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;
  try {
    const newAdmin = await registerAdmin({ name, email, password, phone });
    res.status(201).json(newAdmin);
  } catch (error: any) {
    res.status(500).json(error.message);
    
  }
};


// Get all users
export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get details of a specific user
export const getUserByIdController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await getUserById(String(userId));
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Activate a user
export const activateUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await activateUser(String(userId));
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Deactivate a user
export const deactivateUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await deactivateUser(String(userId));
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// View all bookings
export const getAllBookingsController = async (req: Request, res: Response) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// View all payment statuses
export const getAllPaymentsController = async (req: Request, res: Response) => {
  try {
    const payments = await getAllPayments();
    res.status(200).json(payments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
