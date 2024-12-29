import { Prisma } from "@prisma/client";
import prisma from "../config/database";

/**
 * Function to get all available events
 * @returns 
 */
export const getAllEvents = async () => {
  return await prisma.event.findMany();
};

/**
 * Function to get details of a single event by ID
 * @param id 
 * @returns 
 */
export const getEventById = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new Error('Event not found');
  }

  return event;
};

/**
 * Function to create a new event
 * @param data 
 * @returns 
 */
export const createEvent = async (data: Prisma.EventCreateInput) => {
  return await prisma.event.create({
    data,
  });
};

/**
 * Function to update an event's information
 * @param id 
 * @param data 
 * @returns 
 */
export const updateEvent = async (id: string, data: Prisma.EventUpdateInput) => {
  const event = await prisma.event.update({
    where: { id },
    data,
  });

  if (!event) {
    throw new Error('Event not found');
  }

  return event;
};

/**
 * Function to delete an event by ID
 * @param id 
 * @returns 
 */
export const deleteEvent = async (id: string) => {
  const event = await prisma.event.delete({
    where: { id },
  });

  if (!event) {
    throw new Error('Event not found');
  }

  return event;
};
