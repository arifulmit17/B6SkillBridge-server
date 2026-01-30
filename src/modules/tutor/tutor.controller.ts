
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
        const {search}=req.query;
        const searchString = typeof search === 'string' ? search : undefined;

        const {category}=req.query;
        
        const filterString = typeof category === 'string' ? category : undefined;

        const isFeatured=req.query.isFeatured? req.query.isFeatured === 'true': undefined;
        
      const result = await tutorService.getAllTutors({search: searchString,category:filterString,isFeatured}); 
      console.log(search,category);
      res.status(200).json(result);
    }catch(e){
        res.status(400).json({error: "Tutor fetching failed",details:e});
    }
}

const getTutorById = async (req:Request, res:Response) => {
    try{
        const {id}=req.params;
        if (!id) {
            throw new Error("Tutor Id is required!")
        }
        const result = await tutorService.getTutorById(id as string);
        res.status(200).json(result);
    }catch(e){
        res.status(400).json({error: "Tutor fetching failed",details:e});
    }
}

export const tutorController = { createTutor, getAllTutors,getTutorById };