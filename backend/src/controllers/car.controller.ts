import { Request, Response } from 'express';
import * as carService from '../services/car.service';

export const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await carService.getAllCars();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await carService.getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch car' });
  }
};

export const createCar = async (req: Request, res: Response) => {
  try {
    const car = await carService.createCar(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create car' });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  try {
    const car = await carService.updateCar(req.params.id, req.body);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update car' });
  }
};

export const softDeleteCar = async (req: Request, res: Response) => {
  try {
    const car = await carService.softDeleteCar(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car soft deleted', car });
  } catch (error) {
    res.status(500).json({ error: 'Failed to soft delete car' });
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  try {
    const car = await carService.deleteCar(req.params.id);
    res.json({ message: 'Car deleted', car });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete car' });
  }
};
