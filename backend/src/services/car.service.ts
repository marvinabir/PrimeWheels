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
  return prisma.car.create({
    data: {
      ...data,
      softDeleted: false, // Ensure new car is not soft-deleted
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
    where: { id, softDeleted: false }, // ✅ Prevent updates on soft deleted cars
    data: {
      ...data,
      pricePerDay: data.pricePerDay !== undefined ? parseFloat(data.pricePerDay as any) || 0 : undefined, // 🛠️ FIX: Ensure `pricePerDay` is a Float
    },
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
