import { Request, Response } from 'express';
import { EventService } from '../services/event.service';

const eventService = new EventService();

export class EventController {
  async addEvent(req: Request, res: Response) {
    try {
      const event = await eventService.addEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      const eventId = req.params.id;
      const updatedEvent = await eventService.updateEvent(eventId, req.body);
      res.json(updatedEvent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteEvent(req: Request, res: Response) {
    try {
      await eventService.deleteEvent(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getEvent(req: Request, res: Response) {
    try {
      const event = await eventService.getEvent(req.params.id);
      res.json(event);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAllEvents(req: Request, res: Response) {
    try {
      const events = await eventService.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
