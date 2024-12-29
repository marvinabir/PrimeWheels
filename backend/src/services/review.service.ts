import prisma from "../config/database";

// Get all reviews for an event
export const getAllReviewsForEvent = async (eventId: string) => {
  return await prisma.review.findMany({
    where: { eventId },
    include: { user: true, event: true },
  });
};

// Add a review for an event
export const addReviewForEvent = async (userId: string, eventId: string, rating: number, comment?: string) => {
  return await prisma.review.create({
    data: {
      userId,
      eventId,
      rating,
      comment,
    },
  });
};

// Update a review
export const updateReview = async (reviewId: string, rating: number, comment?: string) => {
  return await prisma.review.update({
    where: { id: reviewId },
    data: { rating, comment },
  });
};

// Delete a review
export const deleteReview = async (reviewId: string) => {
  return await prisma.review.delete({
    where: { id: reviewId },
  });
};
