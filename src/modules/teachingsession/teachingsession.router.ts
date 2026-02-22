import express from 'express';
import { teachingSessionController } from './teachingsession.controller';
import auth, { UserRole } from '../../middleware/auth';




const router = express.Router();
router.get('/',teachingSessionController.getAllTeachingSessions);
router.patch('/:sessionId',auth(UserRole.TUTOR,UserRole.ADMIN), teachingSessionController.updateTeachingSessionById);
router.post('/',auth(UserRole.TUTOR,UserRole.ADMIN),teachingSessionController.createTeachingSession);
router.delete('/:sessionId',auth(UserRole.TUTOR,UserRole.ADMIN),teachingSessionController.deleteTeachingSessionById);


export const teachingSessionRouter = router;