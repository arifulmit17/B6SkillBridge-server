import express from 'express';
import { reviewController, updateReviewById } from './review.controller';
import auth, { UserRole } from '../../middleware/auth';



const router = express.Router();
router.get('/',reviewController.getAllReviews);
router.get('/tutor',reviewController.getReviewsByTutorId);
router.post('/',auth(UserRole.USER,UserRole.ADMIN), reviewController.createReview);
router.patch('/:reviewId',auth(UserRole.USER,UserRole.ADMIN),  reviewController.updateReviewById);
router.delete('/:reviewId',auth(UserRole.USER,UserRole.ADMIN),  reviewController.deleteReviewById);

export const reviewRouter = router;