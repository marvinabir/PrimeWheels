import { Request, Response } from 'express';
import * as bookingService from '../services/booking.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, carId, startDate, endDate, totalAmount } = req.body;

    // Validate that the user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const booking = await bookingService.createBooking({
      userId,
      carId,
      startDate,
      endDate,
      totalAmount,
    });

    res.status(201).json(booking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    res.json(booking);
  } catch (error: any) {
    res.status(404).json({ error: 'Booking not found' });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const updatedBooking = await bookingService.updateBookingStatus(req.params.id, status);
    res.json(updatedBooking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const canceledBooking = await bookingService.cancelBooking(req.params.id);
    res.json(canceledBooking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCarStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const updatedCar = await bookingService.updateCarStatus(req.params.carId, status);
    res.json(updatedCar);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
