import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class UserService {
  async registerUser(data: { name: string; email: string; phone: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: 'user', // Default role
      },
    });
  }

  async loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1d',
    });

    return { token, user };
  }

  async assignRole(userId: string, role: 'user' | 'admin' | 'organizer') {
    return await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  }

  async deleteUser(userId: string) {
    return await prisma.user.delete({
      where: { id: userId },
    });
  }

  // async deactivateUser(userId: string) {
  //   return await prisma.user.update({
  //     where: { id: userId },
  //     data: { isActive: false },
  //   });
  // }

  async getUserBookings(userId: string) {
    return await prisma.booking.findMany({
      where: { userId },
      include: { car: true, ticket: true },
    });
  }

  async getUserReviews(userId: string) {
    return await prisma.review.findMany({
      where: { userId },
      include: { car: true },
    });
  }

  async getUserProfile(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, phone: true, role: true },
    });
  }

  async updateUserProfile(userId: string, data: { name?: string; email?: string; phone?: string }) {
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  }
}
