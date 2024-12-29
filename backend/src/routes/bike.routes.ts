import { Router } from 'express';
import {
  getAllBikesController,
  getBikeByIdController,
  addBikeController,
  updateBikeController,
  softDeleteBikeController,
  deleteBikeController,
} from '../controllers/bike.controller';

const router = Router();

router.get('/', getAllBikesController);
router.get('/:id', getBikeByIdController);
router.post('/', addBikeController);  // Admin only (secured with middleware)
router.put('/:id', updateBikeController); // Admin only (secured with middleware)
router.put('/:id/soft-delete', softDeleteBikeController);  // Admin only (soft delete)
router.delete('/:id', deleteBikeController);  // Admin only (hard delete)

export default router;
