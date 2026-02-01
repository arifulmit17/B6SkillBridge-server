import { teachingSessionService } from "./teachingsession.service";
import { Request, Response } from 'express';

const createTeachingSession = async (req:Request, res:Response) => {
    try{
      const result = await teachingSessionService.createTeachingSession(req.body);
      res.status(201).json(result);
    }catch(e){
        res.status(400).json({error: "Teaching session creation failed",details:e});
        
    }
    
}

const getAllTeachingSessions = async (req:Request, res:Response) => {
    try{
        const {tutorid}=req.query;
        
      const result = await teachingSessionService.getAllTeachingSessions();
      res.status(200).json(result);
    }catch(e){
        res.status(400).json({error: "Teaching session fetching failed",details:e});
        
    }
    
}

export const teachingSessionController = { createTeachingSession, getAllTeachingSessions };