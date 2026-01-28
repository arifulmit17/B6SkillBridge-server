import { TutorProfile } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createTutor = async (data: Omit<TutorProfile, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.tutorProfile.create({
        data
    })
    return result;
}

const getAllTutors= async (payload:{search: string | undefined})=>{
    const result =await prisma.tutorProfile.findMany({
        where: {

            OR:[
                {
            subject: {
                contains: payload.search as string,
                mode: 'insensitive'
            }
                },
                {
            price: {
                contains: payload.search as string,
                mode: 'insensitive'
            }
                },
                {
                    reviews:{
                        some:{
                            rating: payload.search as string
                        }
                    }
                }
                
            ]
            
        },
        include: {
    reviews: {
      select: { rating: true, comment: true}
    }
  }
    });
     return result;
}

export const tutorService = { 
    createTutor,
    getAllTutors

 };