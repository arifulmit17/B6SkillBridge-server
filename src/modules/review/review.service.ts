
import { Reviews } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createReview = async (data: Omit<Reviews, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.reviews.create({
        data
    })
    return result;
}

export const reviewService = { createReview };