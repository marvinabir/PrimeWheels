import prisma from "../config/database";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';


// Register new user
export const registerUser = async (data: { name: string; email: string; password: string; phone?: string }) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

// Login user
export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'defaultSecret');
  return { token, user };
};

// Get user profile
export const getUserProfile = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      bookings: true,
      reviews: true,
      payments: true
    }
  });
};

// Update user profile (name, phone, profilePicture)
export const updateUserProfile = async (userId: string, data: { name?: string; phone?: string; profilePicture?: string }) => {
  return await prisma.user.update({
    where: { id: userId },
    data
  });
};

// Get all user bookings (events and bikes)
export const getUserBookings = async (userId: string) => {
  return await prisma.booking.findMany({
    where: { userId },
    include: {
      bike: true,
      event: true
    }
  });
};

// Get all user reviews
export const getUserReviews = async (userId: string) => {
  return await prisma.review.findMany({
    where: { userId },
    include: {
      event: true
    }
  });
};

// Deactivate user account
export const deactivateUserAccount = async (userId: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { email: '', password: '', name: 'Deactivated User' }  // Removing sensitive information
  });
};

// Reset password (step 1: send code)
export const sendResetPasswordCode = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate random 6-digit code
  await prisma.user.update({ where: { email }, data: { resetCode } });

  // Send reset code via email
  await sendMail(email, resetCode);

  return resetCode; // For debugging purposes (can remove in production)
};

// Reset password (step 2: verify code and reset)
export const resetPassword = async (email: string, resetCode: string, newPassword: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.resetCode !== resetCode) {
    throw new Error('Invalid reset code');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword, resetCode: null },  // Clear reset code after successful reset
  });
};
function sendMail(email: string, resetCode: string) {
  throw new Error('Function not implemented.');
}

