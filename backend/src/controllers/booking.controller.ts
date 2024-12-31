import { Request, Response } from 'express';
import * as bookingService from '../services/booking.service';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.createBooking(req.body);
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
    res.status(404).json({ error: error.message });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.updateBookingStatus(req.params.id, req.body.status);
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update booking status' });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.cancelBooking(req.params.id);
    res.json(booking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCarStatus = async (req: Request, res: Response) => {
  try {
    const car = await bookingService.updateCarStatus(req.params.carId, req.body.status);
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update car status' });
  }
};
