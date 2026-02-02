import { userService } from "./user.service";
import { Request, Response } from 'express';


const getAllUsers = async (req:Request, res:Response) => {
    try{
        
      const result = await userService.getAllUser();
      res.status(200).json(result);
    }catch(e){
        res.status(400).json({error: "Review fetching failed",details:e});
        
    }
    
}

const updateUserById = async (req:Request, res:Response) => {
    try{
        const {userId}=req.params;
        console.log(userId);
        
        const result = await userService.updateUserById(userId as string,req.body);
        res.status(200).json(result);
    }catch(e){
        res.status(400).json({error: "Tutor update failed",details:e});
    }
}
export const userController = { getAllUsers,updateUserById }