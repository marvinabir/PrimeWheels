import prisma from "../config/database";
import bcrypt from 'bcrypt';



// Register new admin
export const registerAdmin = async (data: { name: string; email: string; password: string; phone?: string }) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
};


// Get all users
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: { bookings: true, payments: true },
  });
};

// Get details of a specific user
export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: { bookings: true, payments: true },
  });
};

// Activate a user
export const activateUser = async (userId: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { role: 'USER' }, // Assuming deactivated users have a role of a different type
  });
};

// Deactivate a user
export const deactivateUser = async (userId: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { role: 'ADMIN' }, // Admin has control to deactivate the user by changing the role
  });
};

// View all bookings
export const getAllBookings = async () => {
  return await prisma.booking.findMany({
    include: { user: true, bike: true, event: true },
  });
};

// View all payment statuses
export const getAllPayments = async () => {
  return await prisma.payment.findMany({
    include: { user: true },
  });
};
