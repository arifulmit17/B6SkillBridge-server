import { teachingSessionService } from "./teachingsession.service";
import { Request, Response } from 'express';

const createTeachingSession = async (req:Request, res:Response) => {
    console.log(req.body);
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

const updateTeachingSessionById = async (req:Request, res:Response) => {
    try{
        const {sessionId}=req.params;
        console.log(sessionId);
        
        const result = await teachingSessionService.updateSessionById(sessionId as string,req.body);
        res.status(200).json(result);
    }catch(e){
        res.status(400).json({error: "Teaching session update failed",details:e});
    }
}

const deleteTeachingSessionById = async (req:Request, res:Response) => {
    try{
        const {sessionId}=req.params;
        const result = await teachingSessionService.deleteSessionById(sessionId as string);
        res.status(200).json(result);
    }catch(e){
        res.status(400).json({error: "Teaching session deletion failed",details:e});
    }
}

export const teachingSessionController = { createTeachingSession, getAllTeachingSessions, deleteTeachingSessionById,updateTeachingSessionById };