//import prisma from "../config/database";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ReviewService {
  async addReview(data: { userId: string; carId: string; content: string; rating: number }) {
    return await prisma.review.create({
      data,
      include: {
        user: true,
        car: true,
      },
    });
  }

  async getAllReviews() {
    return await prisma.review.findMany({
      include: {
        user: true,
        car: true,
      },
    });
  }

  async getReviewById(id: string) {
    return await prisma.review.findUnique({
      where: { id },
      include: {
        user: true,
        car: true,
      },
    });
  }

  async getReviewsByCar(carId: string) {
    return await prisma.review.findMany({
      where: { carId },
      include: {
        user: true,
      },
    });
  }

  async getReviewsByUser(userId: string) {
    return await prisma.review.findMany({
      where: { userId },
      include: {
        car: true,
      },
    });
  }

  async deleteReview(id: string) {
    return await prisma.review.delete({
      where: { id },
    });
  }
}
