import prisma from "../config/database";
import { BikeStatus } from "../interfaces/interface";


/**
 * Get all available bikes
 * @returns 
 */
const getAllBikes = async () => {
  return await prisma.bike.findMany({
    where: {
      status: BikeStatus.AVAILABLE,
    },
    include: { bookings: true }
  });
};

/**
 * Get details of a single bike
 * @param id 
 * @returns 
 */
const getBikeById = async (id: string) => {
  return await prisma.bike.findUnique({
    where: { id },
    include: { bookings: true },
  });
};

/**
 * Add a new bike
 * @param model 
 * @param status 
 * @param image 
 * @returns 
 */
const addBike = async (model: string, status: string, image?: string) => {
  const bikeStatus = status as BikeStatus; // Ensure status is cast to BikeStatus enum

  return await prisma.bike.create({
    data: {
      model,
      status: bikeStatus,
      image,
    },
  });
};

/**
 * Update bike information
 * @param id 
 * @param model 
 * @param status 
 * @param image 
 * @returns 
 */
const updateBike = async (id: string, model: string, status: string, image?: string) => {
  const bikeStatus = status as BikeStatus; // Ensure status is cast to BikeStatus enum

  return await prisma.bike.update({
    where: { id },
    data: {
      model,
      status: bikeStatus,
      image,
    },
  });
};

/**
 * Soft delete a bike (set status to BOOKED)
 * @param id 
 * @returns 
 */
const softDeleteBike = async (id: string) => {
  return await prisma.bike.update({
    where: { id },
    data: {
      status: BikeStatus.BOOKED,
    },
  });
};

/**
 * Delete a bike permanently
 * @param id 
 * @returns 
 */
const deleteBike = async (id: string) => {
  return await prisma.bike.delete({
    where: { id },
  });
};

export {
  getAllBikes,
  getBikeById,
  addBike,
  updateBike,
  softDeleteBike,
  deleteBike,
};