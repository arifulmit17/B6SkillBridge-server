
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

export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params
    

    const result = await categoryService.updateCategoryById(
      categoryId as string,
      req.body
    )

    res.status(200).json(result)
  } catch (e) {
    res.status(400).json({
      error: "Category update failed",
      details: e,
    })
  }
}

export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params

    const result = await categoryService.deleteCategoryById(categoryId as string)

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete category",
      error,
    })
  }
}


export const categoryController = { createCategory, getAllCategories ,updateCategoryById,deleteCategoryById};