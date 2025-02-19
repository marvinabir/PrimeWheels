import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TicketService {
  async getTicketByBookingId(bookingId: string) {
    return await prisma.ticket.findUnique({
      where: { bookingId },
    });
  }

  // async getTicketsByUserId(userId: string) {
  //   return await prisma.ticket.findMany({
  //     where: {
  //       userDetails: {
  //         contains: `"id":"${userId}"`, // Assumes userDetails is stored as JSON
  //       },
  //     },
  //   });
  // }



  async getTicketsByUserId(userId: string) {
    try {
      const tickets = await prisma.ticket.findMany({
        where: {
          OR: [
            {
              userDetails: {
                contains: `"id":"${userId}"`, // Fallback if userDetails is stored as a string
              },
            },
          ],
        },
      });

      return tickets;
    } catch (error) {
      throw new Error(`Failed to get tickets for userId ${userId}: ${error}`);
    }
  }


  async getAllTickets() {
    return await prisma.ticket.findMany();
  }
}
