
import { Request, Response } from 'express';
import { tutorService } from './tutor.service';
import { auth } from './../../lib/auth';
import { TutorProfile } from '../../generated/prisma/client';

const createTutor = async (req:Request, res:Response) => {
    try{
      const result = await tutorService.createTutor(req.body);
      res.status(201).json(result);
    }catch(e){
        res.status(400).json({error: "Tutor creation failed",details:e});
        
    }
    
}

export const tutorController = { createTutor };