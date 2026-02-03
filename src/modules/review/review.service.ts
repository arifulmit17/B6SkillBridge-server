
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
    
    const result= await prisma.reviews.findMany({
        where: {tutorId}
    }
    )
    return result;
 }

 const updateReviewById=async (reviewId:string,data:Partial<Reviews>)=>{
      console.log(data);
     const result= await prisma.reviews.update({
         where:{
             id:reviewId
         },
         data
     })
     return result;
  }

  const deleteReviewById=async (reviewId:string)=>{
    
    const result= await prisma.reviews.delete({
        where:{
            id:reviewId
        }
    })
    return result;
 }



export const reviewService = { createReview,getReviewsByTutorId,getAllReviews,updateReviewById,deleteReviewById };