import prisma from "../config/database";
import { v4 as uuidv4 } from 'uuid'; // For generating unique ticket numbers


// Get ticket details by booking ID
export const getTicketByBookingId = async (bookingId: string) => {
  return await prisma.ticket.findUnique({
    where: { bookingId },
    include: { booking: { include: { user: true, bike: true, event: true } } },
  });
};

// Generate a new ticket after booking confirmation
export const generateTicket = async (bookingId: string, details: string) => {
  const ticketNumber = uuidv4(); // Generate a unique ticket number
  const date = new Date().toISOString();
  
  return await prisma.ticket.create({
    data: {
      bookingId,
      ticketNumber,
      date,
      details,
    },
  });
};

// Get all tickets in a booking
export const getAllTicketsInBooking = async () => {
  return await prisma.ticket.findMany({
    include: { booking: { include: { user: true, bike: true, event: true } } },
  });
};
