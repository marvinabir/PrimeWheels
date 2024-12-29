import { Router } from 'express';
import {
  getPaymentHistoryForUserController,
  triggerMpesaPaymentController,
  checkPaymentStatusController,
} from '../controllers/payment.controller';

const router = Router();

// Get all payment history for a user
router.get('/payments/history/:userId', getPaymentHistoryForUserController);

// Trigger M-Pesa Payment
router.post('/payments/mpesa/:userId', triggerMpesaPaymentController);

// Check Payment Status
router.get('/payments/status/:invoiceId', checkPaymentStatusController);

export default router;
