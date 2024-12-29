import prisma from "../config/database";
import { PaymentStatus } from "../interfaces/interface";

const IntaSend = require('intasend-node');

// Initialize IntaSend
let intasend = new IntaSend(
  process.env.INTASEND_PUBLISHABLE_KEY,
  process.env.INTASEND_SECRET_KEY,
  true, // Set to true for test environment, false for production
);

// Get all payment history for a user
export const getPaymentHistoryForUser = async (userId: string) => {
  return await prisma.payment.findMany({
    where: { userId },
    include: { user: true },
  });
};

// Trigger M-Pesa STK Push Payment
export const triggerMpesaPayment = async (userId: string, amount: number, phone_number: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const payment = await prisma.payment.create({
      data: {
        userId,
        amount,
        status: PaymentStatus.PENDING,
      },
    });

    const paymentResponse = await intasend.collection().mpesaStkPush({
      first_name: user.name.split(' ')[0],
      last_name: user.name.split(' ')[1] || '',
      email: user.email,
      phone_number,
      amount,
      api_ref: `PAYMENT-${payment.id}`,
      host: 'localhost',
    });

    if (paymentResponse && paymentResponse.status === 'success') {
      // Store invoice_id for tracking payment status
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          invoiceId: paymentResponse.invoice_id,  // Ensure invoiceId is used here
        },
      });
      
    }

    return paymentResponse;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error triggering M-Pesa STK Push: ${err.message}`);
    } else {
      throw new Error('Unknown error occurred while triggering M-Pesa STK Push');
    }
  }
};

// Check payment status
export const checkPaymentStatus = async (invoiceId: string) => {
  try {
    const statusResponse = await intasend.collection().status(invoiceId);

    // Update payment status in the database based on IntaSend response
    const paymentStatus =
      statusResponse.invoice.state === 'COMPLETED'
        ? PaymentStatus.COMPLETED
        : statusResponse.invoice.state === 'FAILED'
        ? PaymentStatus.FAILED
        : PaymentStatus.PENDING;

    await prisma.payment.updateMany({
      where: { invoiceId },
      data: {
        status: paymentStatus,
      },
    });

    return statusResponse;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error checking payment status: ${err.message}`);
    } else {
      throw new Error('Unknown error occurred while checking payment status');
    }
  }
};
