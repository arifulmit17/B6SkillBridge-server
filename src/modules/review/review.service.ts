
import { Reviews } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createReview = async (data: Omit<Reviews, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.reviews.create({
        data
    })
    return result;
}

 const getReviewsByTutorId=async (tutorId:string)=>{
    const result= await prisma.reviews.findMany({
        where:{tutorId}
    }
    )
    return result;
 }

export const reviewService = { createReview,getReviewsByTutorId };