import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TicketService {
  async getTicketByBookingId(bookingId: string) {
    return await prisma.ticket.findUnique({
      where: { bookingId },
    });
  }

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

      return await this.addUsernamesToTickets(tickets);
    } catch (error) {
      throw new Error(`Failed to get tickets for userId ${userId}: ${error}`);
    }
  }

  async getAllTickets() {
    try {
      const tickets = await prisma.ticket.findMany();
      return await this.addUsernamesToTickets(tickets);
    } catch (error) {
      throw new Error(`Failed to get all tickets: ${error}`);
    }
  }

  private async addUsernamesToTickets(tickets: any[]) {
    return await Promise.all(
      tickets.map(async (ticket) => {
        try {
          let userDetails = JSON.parse(ticket.userDetails || "{}");
          if (userDetails.userId) {
            const user = await prisma.user.findUnique({
              where: { id: userDetails.userId },
              select: { name: true },
            });

            if (user) {
              userDetails.username = user.name; // ✅ Add username directly inside userDetails
            }
          }
          return { ...ticket, userDetails: JSON.stringify(userDetails) };
        } catch (error) {
          console.error("Error parsing userDetails:", error);
          return ticket;
        }
      })
    );
  }
}
