
import { Request, Response } from 'express';
import { reviewService } from './review.service';



const createReview = async (req:Request, res:Response) => {
    try{
      const result = await reviewService.createReview(req.body);
      res.status(201).json(result);
    }catch(e){
        res.status(400).json({error: "Review creation failed",details:e});
        
    }
    
}
const getReviewsByTutorId = async (req:Request, res:Response) => {
    try{
        const id=req.query.tutorId;
      const result = await reviewService.getReviewsByTutorId(id as string);
      res.status(201).json(result);
    }catch(e){
        res.status(400).json({error: "Review fetching failed",details:e});
        
    }
    
}

export const reviewController = { createReview,getReviewsByTutorId };