import express from 'express';
import { categoryController } from './category.controller';
import auth, { UserRole } from '../../middleware/auth';


const router = express.Router();
router.get('/', categoryController.getAllCategories);
router.get('/:categoryId', categoryController.getCategoryById);
router.post('/',auth(UserRole.ADMIN), categoryController.createCategory);
router.patch('/:categoryId',auth(UserRole.ADMIN), categoryController.updateCategoryById);
router.delete('/:categoryId',auth(UserRole.ADMIN), categoryController.deleteCategoryById);


export const categoryRouter = router;