import express from 'express';
import { tutorController } from './tutor.controller';
import auth, { UserRole } from '../../middleware/auth';

const router = express.Router();
router.get('/user', tutorController.getTutorByUserId);
router.get('/', tutorController.getAllTutors);

router.get('/:id', tutorController.getTutorById);
router.patch('/:id',auth(UserRole.TUTOR, UserRole.ADMIN), tutorController.updateTutorById);
router.post('/',auth(UserRole.TUTOR), tutorController.createTutor);


export const tutorRouter = router;