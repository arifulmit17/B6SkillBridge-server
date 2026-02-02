import express, { Router } from 'express';
import { userController } from './user.controller';
const router = express.Router();
router.get('/', userController.getAllUsers);
router.patch('/:userId', userController.updateUserById);

export const userRouter = router;