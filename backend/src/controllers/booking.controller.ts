import { Request, Response } from 'express';
import { getAllBookings, getBookingById, createBooking, updateBookingStatus, cancelBooking } from '../services/booking.service';

// Get all bookings
export const getAllBookingsController = async (req: Request, res: Response) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single booking by ID
export const getBookingByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const booking = await getBookingById(String(id));
    if (!booking) {
      res.status(404).json({ message: 'Booking not found.' });
      return;
    }
    res.status(200).json(booking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new booking
export const createBookingController = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newBooking = await createBooking(data);
    res.status(201).json(newBooking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update booking status
export const updateBookingStatusController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedBooking = await updateBookingStatus(String(id), status);
    res.status(200).json(updatedBooking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel a booking
export const cancelBookingController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await cancelBooking(String(id));
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};







// import { Request, Response } from 'express';
// import { getAllBookings, getBookingById, createBooking, updateBookingStatus, cancelBooking } from '../services/booking.service';

// // Get all bookings
// export const getAllBookingsController = async (req: Request, res: Response) => {
//   try {
//     const bookings = await getAllBookings();
//     res.status(200).json(bookings);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get a specific booking by ID
// export const getBookingByIdController = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const booking = await getBookingById(String(id));
//     if (!booking) return res.status(404).json({ message: 'Booking not found' });
//     res.status(200).json(booking);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Create a new booking
// export const createBookingController = async (req: Request, res: Response) => {
//   const data = req.body;
//   try {
//     const newBooking = await createBooking(data);
//     res.status(201).json(newBooking);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update booking status
// export const updateBookingStatusController = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   try {
//     const updatedBooking = await updateBookingStatus(String(id), status);
//     res.status(200).json(updatedBooking);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Cancel a booking
// export const cancelBookingController = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const cancelledBooking = await cancelBooking(String(id));
//     res.status(200).json(cancelledBooking);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };
