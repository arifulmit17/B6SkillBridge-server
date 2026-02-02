import { get } from "node:http";

import { prisma } from "../../lib/prisma";



const getAllUser=async ()=>{
    const result =await prisma.user.findMany()
    return result
}

const updateUserById=async (userId:string,data)=>{
     console.log(data);
    const result= await prisma.user.update({
        where:{
            id:userId
        },
        data
    })
    return result;
 }

export const userService = { getAllUser,updateUserById};