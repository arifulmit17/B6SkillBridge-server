
import { Request, Response } from 'express';
import { categoryService } from './category.service';


const createCategory = async (req:Request, res:Response) => {
    try{
      const result = await categoryService.createCategory(req.body);
      res.status(201).json(result);
    }catch(e){
        res.status(400).json({error: "Category creation failed",details:e});
        
    }
    
}

const getAllCategories = async (req:Request, res:Response) => {
    try{
      const result = await categoryService.getAllCategories();
      res.status(201).json(result);
    }catch(e){
        res.status(400).json({error: "Categories fetching failed",details:e});
    }
}

export const categoryController = { createCategory, getAllCategories };