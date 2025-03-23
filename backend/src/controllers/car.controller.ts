import { Request, Response } from 'express';
import * as carService from '../services/car.service';

export const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await carService.getAllCars();
    res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Car ID is required' });

    const car = await carService.getCarById(id);
    if (!car) return res.status(404).json({ error: 'Car not found' });

    res.status(200).json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ error: 'Failed to fetch car' });
  }
};

export const createCar = async (req: Request, res: Response) => {
  try {
    const { name, brand, registrationNumber, pricePerDay, imageUrl } = req.body;

    if (!name || !brand || !registrationNumber || !pricePerDay) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const car = await carService.createCar({ name, brand, registrationNumber, pricePerDay, imageUrl });
    res.status(201).json(car);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Failed to create car' });
  }
};


export const updateCar = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Car ID is required' });

    const car = await carService.updateCar(id, req.body);
    if (!car) return res.status(404).json({ error: 'Car not found' });

    res.status(200).json(car);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'Failed to update car' });
  }
};

export const softDeleteCar = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Car ID is required' });

    const car = await carService.softDeleteCar(id);
    if (!car) return res.status(404).json({ error: 'Car not found' });

    res.status(200).json({ message: 'Car soft deleted', car });
  } catch (error) {
    console.error('Error soft deleting car:', error);
    res.status(500).json({ error: 'Failed to soft delete car' });
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Car ID is required' });

    const car = await carService.deleteCar(id);
    res.status(200).json({ message: 'Car deleted', car });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Failed to delete car' });
  }
};

;