import express from 'express';
import { tutorController } from './tutor.controller';

const router = express.Router();
router.get('/', tutorController.getAllTutors);
router.post('/', tutorController.createTutor);


export const tutorRouter = router;