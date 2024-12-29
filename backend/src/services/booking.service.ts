import { PrismaClient, BookingStatus, BikeStatus } from '@prisma/client';

const prisma = new PrismaClient();

// Get all bookings
export const getAllBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      user: true,
      bike: true,
      event: true,
      ticket: true, // Include ticket details
    },
  });
};

// Get a single booking by ID
export const getBookingById = async (id: string) => {
  return await prisma.booking.findUnique({
    where: { id },
    include: {
      user: true,
      bike: true,
      event: true,
      ticket: true, // Include ticket details
    },
  });
};

// Create a new booking
export const createBooking = async (data: any) => {
  const { userId, bikeId, eventId, status } = data;

  if (bikeId) {
    // Check if the bike is available
    const bike = await prisma.bike.findUnique({
      where: { id: bikeId },
    });

    if (!bike || bike.status !== BikeStatus.AVAILABLE) {
      throw new Error('Bike is not available for booking.');
    }

    // Create booking and update bike status to BOOKED
    const booking = await prisma.booking.create({
      data: {
        userId,
        bikeId,
        eventId,
        status: status || BookingStatus.PENDING, // Default status to PENDING if not provided
      },
    });

    // Update the bike status to BOOKED (soft-delete)
    await prisma.bike.update({
      where: { id: bikeId },
      data: { status: BikeStatus.BOOKED },
    });

    // Generate a ticket for the booking
    const ticket = await prisma.ticket.create({
      data: {
        bookingId: booking.id,
        ticketNumber: `TICKET-${Date.now()}`, // Simple ticket number generation
        date: new Date().toISOString(),
        details: `Bike Model: ${bike?.model}`, // Add bike details
      },
    });

    // Return the booking with the associated ticket
    return {
      ...booking,
      ticket,
    };
  } else {
    throw new Error('Bike ID is required for creating a booking.');
  }
};

// Update booking status
export const updateBookingStatus = async (id: string, status: BookingStatus) => {
  return await prisma.booking.update({
    where: { id },
    data: { status },
  });
};

// Cancel a booking and make the bike available again
export const cancelBooking = async (id: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { bike: true },
  });

  if (!booking) {
    throw new Error('Booking not found.');
  }

  // Update the booking status to CANCELLED
  await prisma.booking.update({
    where: { id },
    data: { status: BookingStatus.CANCELLED },
  });

  // If the booking has a bike, update its status to AVAILABLE
  if (booking.bikeId) {
    await prisma.bike.update({
      where: { id: booking.bikeId },
      data: { status: BikeStatus.AVAILABLE },
    });
  }

  return { message: 'Booking cancelled and bike is now available.' };
};










// import prisma from "../config/database";
// import { BookingStatus } from '@prisma/client';


// // Get all bookings
// export const getAllBookings = async () => {
//   return await prisma.booking.findMany({
//     include: { user: true, bike: true, event: true },
//   });
// };

// // Get details of a specific booking by ID
// export const getBookingById = async (id: string) => {
//   return await prisma.booking.findUnique({
//     where: { id },
//     include: { user: true, bike: true, event: true, ticket: true},
//   });
// };

// // Create a new booking
// export const createBooking = async (data: any) => {
//   return await prisma.booking.create({
//     data,
//   });
// };

// // Update booking status
// export const updateBookingStatus = async (id: string, status: BookingStatus) => {
//   return await prisma.booking.update({
//     where: { id },
//     data: { status },
//   });
// };

// // Cancel a booking
// export const cancelBooking = async (id: string) => {
//   return await prisma.booking.update({
//     where: { id },
//     data: { status: BookingStatus.CANCELLED },
//   });
// };
