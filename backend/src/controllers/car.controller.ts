import { Request, Response } from 'express';
import { getAllBikes, getBikeById, addBike, updateBike, softDeleteBike, deleteBike } from '../services/bike.service';

/**
 * Controller to get all available bikes
 * @param req 
 * @param res 
 */
export const getAllBikesController = async (req: Request, res: Response) => {
  try {
    const bikes = await getAllBikes();
    res.status(200).json(bikes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to get a single bike by ID
 * @param req 
 * @param res 
 */
export const getBikeByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const bike = await getBikeById(String(id));
    res.status(200).json(bike);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

/**
 * Controller to add a new bike
 * @param req 
 * @param res 
 */
export const addBikeController = async (req: Request, res: Response) => {
  const { model, status, image } = req.body;
  try {
    const bike = await addBike(model, status, image);
    res.status(201).json(bike);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to update bike details by ID
 * @param req 
 * @param res 
 */
export const updateBikeController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { model, status, image } = req.body; // Destructure necessary fields

  try {
    const updatedBike = await updateBike(String(id), model, status, image);
    res.status(200).json(updatedBike);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to soft delete a bike (set status to BOOKED)
 * @param req 
 * @param res 
 */
export const softDeleteBikeController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const bike = await softDeleteBike(String(id));
    res.status(200).json(bike);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to permanently delete a bike by ID
 * @param req 
 * @param res 
 */
export const deleteBikeController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteBike(String(id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
