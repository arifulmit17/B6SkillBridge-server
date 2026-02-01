import express from 'express';
import { teachingSessionController } from './teachingsession.controller';




const router = express.Router();
router.get('/',teachingSessionController.getAllTeachingSessions);
router.patch('/:sessionId',teachingSessionController.updateTeachingSessionById);
router.post('/',teachingSessionController.createTeachingSession);
router.delete('/:sessionId',teachingSessionController.deleteTeachingSessionById);


export const teachingSessionRouter = router;