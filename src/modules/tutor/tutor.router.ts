import express from 'express';
import { tutorController } from './tutor.controller';

const router = express.Router();
router.get('/user', tutorController.getTutorByUserId);
router.get('/', tutorController.getAllTutors);

router.get('/:id', tutorController.getTutorById);
router.post('/', tutorController.createTutor);


export const tutorRouter = router;