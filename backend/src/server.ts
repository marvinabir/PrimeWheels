import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import carRoutes from './routes/car.routes';
import eventRoutes from './routes/event.routes';
import bookingRoutes from './routes/booking.routes';
import ticketRoutes from './routes/ticket.routes';
import reviewRoutes from './routes/review.routes';
// import adminRoutes from './routes/admin.routes';
// import paymentRoutes from './routes/payment.routes';
import userRoutes from './routes/user.routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Configure CORS
 */
const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

/**
 * Middleware to parse JSON requests
 */
app.use(express.json());

/**
 * Routes
 */
app.use('/api/cars', carRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api', reviewRoutes);
// app.use('/', adminRoutes);
// app.use('/api', paymentRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
