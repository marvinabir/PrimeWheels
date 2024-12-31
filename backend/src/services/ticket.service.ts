import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TicketService {
  async getTicketByBookingId(bookingId: string) {
    return await prisma.ticket.findUnique({
      where: { bookingId },
    });
  }

  async getTicketsByUserId(userId: string) {
    return await prisma.ticket.findMany({
      where: {
        userDetails: {
          contains: `"id":"${userId}"`, // Assumes userDetails is stored as JSON
        },
      },
    });
  }

  async getAllTickets() {
    return await prisma.ticket.findMany();
  }
}
