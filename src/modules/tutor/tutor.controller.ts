
import { Request, Response } from 'express';
import { tutorService } from './tutor.service';

const createTutor = async (req:Request, res:Response) => {
    try{
      const result = await tutorService.createTutor(req.body);
      res.status(201).json(result);
    }catch(e){
        res.status(400).json({error: "Tutor creation failed",details:e});
        
    }
    
}

const getAllTutors = async (req:Request, res:Response) => {
    try{
      const result = await tutorService.getAllTutors(); 
      res.status(200).json(result);
    }catch(e){
        res.status(400).json({error: "Tutor fetching failed",details:e});
    }
}

export const tutorController = { createTutor, getAllTutors };