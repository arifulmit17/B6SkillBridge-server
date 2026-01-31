
import { Reviews } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createReview = async (data: Omit<Reviews, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.reviews.create({
        data
    })
    return result;
}

 const getAllReviews = async ()=>{
    const result= await prisma.reviews.findMany();
    return result;
 }

 const getReviewsByTutorId=async (tutorId:string)=>{
    console.log(tutorId);
    const result= await prisma.reviews.findUnique({
        where: {tutorId}
    }
    )
    return result;
 }

export const reviewService = { createReview,getReviewsByTutorId,getAllReviews };