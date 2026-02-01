import { Booking } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";



const createTeachingSession = async (data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.booking.create({
        data
    })
    return result;
}

 const getAllTeachingSessions = async ()=>{
    const result= await prisma.booking.findMany();
    return result;
 }

export const teachingSessionService = { createTeachingSession,getAllTeachingSessions };