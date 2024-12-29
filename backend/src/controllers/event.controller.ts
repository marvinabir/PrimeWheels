import { Request, Response } from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../services/event.service';

/**
 * Controller to get all available events
 * @param req 
 * @param res 
 */
export const getAllEventsController = async (req: Request, res: Response) => {
  try {
    const events = await getAllEvents();
    res.status(200).json(events);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to get a single event by ID
 * @param req 
 * @param res 
 */
export const getEventByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const event = await getEventById(String(id));
    res.status(200).json(event);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

/**
 * Controller to create a new event
 * @param req 
 * @param res 
 */
export const createEventController = async (req: Request, res: Response) => {
  try {
    const eventData = req.body;
    const newEvent = await createEvent(eventData);
    res.status(201).json(newEvent);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to update an event by ID
 * @param req 
 * @param res 
 */
export const updateEventController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedEvent = await updateEvent(String(id), data);
    res.status(200).json(updatedEvent);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to delete an event by ID
 * @param req 
 * @param res 
 */
export const deleteEventController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteEvent(String(id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
