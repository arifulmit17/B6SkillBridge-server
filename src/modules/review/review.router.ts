import express from 'express';
import { reviewController } from './review.controller';



const router = express.Router();
router.get('/',reviewController.getAllReviews);
router.get('/tutor',reviewController.getReviewsByTutorId);
router.post('/', reviewController.createReview);

export const reviewRouter = router;