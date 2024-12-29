import { Request, Response } from 'express';
import {
  getPaymentHistoryForUser,
  triggerMpesaPayment,
  checkPaymentStatus,
} from '../services/payment.service';

// Get all payment history for a user
export const getPaymentHistoryForUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const payments = await getPaymentHistoryForUser(String(userId));
    res.status(200).json(payments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Trigger M-Pesa Payment
export const triggerMpesaPaymentController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { amount, phone_number } = req.body;
  try {
    const paymentResponse = await triggerMpesaPayment(String(userId), Number(amount), phone_number);
    res.status(201).json(paymentResponse);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Check Payment Status
export const checkPaymentStatusController = async (req: Request, res: Response) => {
  const { invoiceId } = req.params;
  try {
    const status = await checkPaymentStatus(invoiceId);
    res.status(200).json(status);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
