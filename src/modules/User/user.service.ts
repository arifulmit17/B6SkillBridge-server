import { get } from "node:http";

import { prisma } from "../../lib/prisma";

const getCurrentUser = async (data: Omit<Reviews, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.reviews.create({
        data
    })
    return result;
}

export const reviewService = { getCurrentUser };