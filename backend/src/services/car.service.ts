import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCars = async () => {
  return prisma.car.findMany({
    where: { softDeleted: false },
  });
};

export const getCarById = async (id: string) => {
  return prisma.car.findUnique({
    where: { id },
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
    data,
  });
};

export const updateCar = async (id: string, data: Partial<{ 
  name: string; 
  brand: string; 
  registrationNumber: string; 
  pricePerDay: number; 
  status: string; 
  imageUrl: string; 
}>) => {
  return prisma.car.update({
    where: { id },
    data,
  });
};

export const softDeleteCar = async (id: string) => {
  return prisma.car.update({
    where: { id },
    data: { softDeleted: true },
  });
};

export const deleteCar = async (id: string) => {
  return prisma.car.delete({
    where: { id },
  });
};
