import { TutorProfile } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createTutor = async (data: Omit<TutorProfile, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.tutorProfile.create({
        data
    })
    return result;
}

const getAllTutors= async ()=>{
    const result =await prisma.tutorProfile.findMany();
     return result;
}

export const tutorService = { 
    createTutor,
    getAllTutors

 };