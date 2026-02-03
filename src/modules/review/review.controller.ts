
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
        const {tutorid}=req.query;
        
      const result = await reviewService.getReviewsByTutorId(tutorid as string);
      res.status(200).json(result);
    }catch(e){
        res.status(400).json({error: "Review fetching failed",details:e});
        
    }
}
const getAllReviews = async (req:Request, res:Response) => {
    try{
        const {tutorid}=req.query;
        
      const result = await reviewService.getAllReviews();
      res.status(200).json(result);
    }catch(e){
        res.status(400).json({error: "Review fetching failed",details:e});
        
    }
    
}

export const updateReviewById = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params
    

    const result = await reviewService.updateReviewById(
      reviewId as string,
      req.body
    )

    res.status(200).json(result)
  } catch (e) {
    res.status(400).json({
      error: "Review update failed",
      details: e,
    })
  }
}

export const deleteReviewById = async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params

    const result = await reviewService.deleteReviewById(reviewId as string) 

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete review",
      error,
    })
  }
}

export const reviewController = { createReview,getReviewsByTutorId,getAllReviews,updateReviewById,deleteReviewById }