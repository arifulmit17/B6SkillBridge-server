import express from 'express';
import { reviewController, updateReviewById } from './review.controller';



const router = express.Router();
router.get('/',reviewController.getAllReviews);
router.get('/tutor',reviewController.getReviewsByTutorId);
router.post('/', reviewController.createReview);
router.patch('/:reviewId', reviewController.updateReviewById);
router.delete('/:reviewId', reviewController.deleteReviewById);

export const reviewRouter = router;