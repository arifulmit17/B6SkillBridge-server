
import { Request, Response } from 'express';
import { tutorService } from './tutor.service';

const createTutor = async (req: Request, res: Response) => {
  try {
    const result = await tutorService.createTutor(req.body);

    res.status(201).json({
      success: true,
      message: "Tutor created successfully",
      data: result,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Tutor creation failed",
      error: e,
    });
  }
};

const getAllTutors = async (req:Request, res:Response) => {
    try{
        const {search}=req.query;
        const searchString = typeof search === 'string' ? search : undefined;

        const {category}=req.query;
        
        const filterString = typeof category === 'string' ? category : undefined;

        const isFeatured=req.query.isFeatured? req.query.isFeatured === 'true': undefined;
        
      const result = await tutorService.getAllTutors({search: searchString,category:filterString,isFeatured}); 
     
      res.status(200).json(result);
    }catch(e){
        res.status(400).json({error: "Tutor fetching failed",details:e});
    }
}

const getTutorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Tutor Id is required!");
    }

    const result = await tutorService.getTutorById(id as string);

    res.status(200).json({
      success: true,
      message: "Tutor retrieved successfully",
      data: result,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Tutor fetching failed",
      error: e,
    });
  }
};

const getTutorByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      throw new Error("User Id is required!");
    }

    const result = await tutorService.getTutorByUserId(id);

    res.status(200).json({
      success: true,
      message: "Tutor retrieved successfully",
      data: result,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Tutor fetching failed",
      error: e,
    });
  }
};

const updateTutorById = async (req: Request, res: Response) => {
  try {
    const { tutorId } = req.params;

    if (!tutorId) {
      throw new Error("Tutor Id is required!");
    }

    const result = await tutorService.updateTutorById(
      tutorId as string,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Tutor updated successfully",
      data: result,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Tutor update failed",
      error: e,
    });
  }
};


export const tutorController = { createTutor, getAllTutors,getTutorById,getTutorByUserId,updateTutorById };