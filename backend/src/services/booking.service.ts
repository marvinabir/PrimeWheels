import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const createBooking = async (data: {
  userId: string;
  carId: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
}) => {
  const car = await prisma.car.findUnique({ where: { id: data.carId } });

  if (!car) throw new Error('Car not found');
  if (car.status !== 'AVAILABLE') throw new Error('Car is not available for booking');

  const booking = await prisma.booking.create({
    data: {
      ...data,
      status: 'CONFIRMED',
    },
  });

  await prisma.car.update({
    where: { id: data.carId },
    data: { status: 'BOOKED' },
  });

  const ticket = await prisma.ticket.create({
    data: {
      bookingId: booking.id,
      uniqueToken: uuidv4(),
      userDetails: JSON.stringify({ userId: data.userId }),
      carDetails: JSON.stringify({ carId: data.carId, carName: car.name, brand: car.brand }),
      bookingDetails: JSON.stringify({
        startDate: data.startDate,
        endDate: data.endDate,
        totalAmount: data.totalAmount,
      }),
    },
  });

  return prisma.booking.findUnique({
    where: { id: booking.id },
    include: { ticket: true },
  });
};

export const getAllBookings = async () => {
  return prisma.booking.findMany({
    include: { ticket: true, car: true, user: true },
  });
};

export const getBookingById = async (id: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { ticket: true, car: true, user: true },
  });

  if (!booking) throw new Error('Booking not found');

  return booking;
};

export const updateBookingStatus = async (id: string, status: 'CONFIRMED' | 'CANCELED' | 'PENDING') => {
  return prisma.booking.update({
    where: { id },
    data: { status },
  });
};

export const cancelBooking = async (id: string) => {
  const booking = await prisma.booking.findUnique({ where: { id } });

  if (!booking) throw new Error('Booking not found');

  await prisma.car.update({
    where: { id: booking.carId },
    data: { status: 'AVAILABLE' },
  });

  return prisma.booking.update({
    where: { id },
    data: { status: 'CANCELED' },
    include: { ticket: true },
  });
};

export const updateCarStatus = async (carId: string, status: 'AVAILABLE' | 'BOOKED' | 'INACTIVE') => {
  return prisma.car.update({
    where: { id: carId },
    data: { status },
  });
};
