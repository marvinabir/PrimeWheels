import { Request, Response } from 'express';
import { TicketService } from '../services/ticket.service';

const ticketService = new TicketService();

export class TicketController {
  async getTicketByBookingId(req: Request, res: Response) {
    try {
      const { bookingId } = req.params;
      const ticket = await ticketService.getTicketByBookingId(bookingId);
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.json(ticket);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTicketsByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const tickets = await ticketService.getTicketsByUserId(userId);
      res.json(tickets);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllTickets(req: Request, res: Response) {
    try {
      const tickets = await ticketService.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
