import { Request, Response } from 'express';
import { getTicketByBookingId, generateTicket, getAllTicketsInBooking } from '../services/ticket.service';

// Get ticket details by booking ID
export const getTicketByBookingIdController = async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  try {
    const ticket = await getTicketByBookingId(String(bookingId));
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json(ticket);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Generate a new ticket after booking confirmation
export const generateTicketController = async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const { details } = req.body;
  try {
    const ticket = await generateTicket(String(bookingId), details);
    res.status(201).json(ticket);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tickets in a booking
export const getAllTicketsInBookingController = async (_req: Request, res: Response) => {
  try {
    const tickets = await getAllTicketsInBooking();
    res.status(200).json(tickets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
