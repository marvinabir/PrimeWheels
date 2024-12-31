//import prisma from "../config/database";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EventService {
  async addEvent(data: { title: string; description: string; date: string; location: string; imageUrl?: string; organizerContact: string }) {
    return await prisma.event.create({
      data,
    });
  }

  async updateEvent(eventId: string, data: { title?: string; description?: string; date?: string; location?: string; imageUrl?: string; organizerContact?: string }) {
    return await prisma.event.update({
      where: { id: eventId },
      data,
    });
  }

  async deleteEvent(eventId: string) {
    return await prisma.event.delete({
      where: { id: eventId },
    });
  }

  async getEvent(eventId: string) {
    return await prisma.event.findUnique({
      where: { id: eventId },
    });
  }

  async getAllEvents() {
    return await prisma.event.findMany();
  }
}
