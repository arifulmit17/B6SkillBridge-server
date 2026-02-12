
import { Booking } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";



const createTeachingSession = async (data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log(data);
    const result = await prisma.booking.create({
        data
    })
    return result;
}

 const getAllTeachingSessions = async ()=>{
    const result= await prisma.booking.findMany({
        
  include: {
    tutor: true,
    student: true,
  },
});
    return result;
 }

 const updateSessionById=async (sessionId:string,data:Partial<Booking>)=>{
     console.log(data);
    const result= await prisma.booking.update({
        where:{
            id:sessionId
        },
        data
    })
    return result;
 }

 const deleteSessionById=async (sessionId:string)=>{
    
    const result= await prisma.booking.delete({
        where:{
            id:sessionId
        }
    })
    console.log(result);
    return result;
 }

export const teachingSessionService = { createTeachingSession,getAllTeachingSessions,deleteSessionById,updateSessionById };