import { PrismaClient } from '@prisma/client';
import { CarStatus } from '../interfaces/interface';

const prisma = new PrismaClient();

export const getAllCars = async () => {
  return prisma.car.findMany({
    where: { softDeleted: false },
  });
};

export const getCarById = async (id: string) => {
  return prisma.car.findUnique({
    where: { id, softDeleted: false }, // Ensure soft deleted cars are excluded
  });
};

export const createCar = async (data: {
  name: string;
  brand: string;
  registrationNumber: string;
  pricePerDay: number;
  imageUrl?: string;
}) => {
  // Check if a car with the same registration number already exists
  const existingCar = await prisma.car.findUnique({
    where: { registrationNumber: data.registrationNumber },
  });

  if (existingCar) {
    throw new Error(`Car with registration number ${data.registrationNumber} already exists.`);
  }

  return prisma.car.create({
    data: {
      ...data,
      softDeleted: false, // Ensure the new car is not soft-deleted by default
      status: CarStatus.AVAILABLE, // Default status
    },
  });
};


export const updateCar = async (
  id: string,
  data: Partial<{
    name: string;
    brand: string;
    registrationNumber: string;
    pricePerDay: number;
    status: CarStatus;
    imageUrl: string;
  }>
) => {
  return prisma.car.update({
    where: { id, softDeleted: false }, // Prevent updates on soft deleted cars
    data,
  });
};

export const softDeleteCar = async (id: string) => {
  return prisma.car.update({
    where: { id, softDeleted: false }, // Prevent soft-deleting an already deleted car
    data: { softDeleted: true },
  });
};

export const deleteCar = async (id: string) => {
  return prisma.car.delete({
    where: { id, softDeleted: false }, // Ensure we do not delete already soft-deleted cars
  });
};
