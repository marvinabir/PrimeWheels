import express from 'express';
import * as carController from '../controllers/car.controller';

const router = express.Router();

router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);
router.post('/', carController.createCar);
router.put('/:id', carController.updateCar);
router.patch('/:id/soft-delete', carController.softDeleteCar);
router.delete('/:id', carController.deleteCar);

export default router;
