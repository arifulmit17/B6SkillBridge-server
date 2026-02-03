import express from 'express';
import { categoryController } from './category.controller';


const router = express.Router();
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.patch('/:categoryId', categoryController.updateCategoryById);
router.delete('/:categoryId', categoryController.deleteCategoryById);


export const categoryRouter = router;