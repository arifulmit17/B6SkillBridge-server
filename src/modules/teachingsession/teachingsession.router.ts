import express from 'express';
import { teachingSessionController } from './teachingsession.controller';




const router = express.Router();
router.get('/',teachingSessionController.getAllTeachingSessions);
router.post('/',teachingSessionController.createTeachingSession);

export const teachingSessionRouter = router;