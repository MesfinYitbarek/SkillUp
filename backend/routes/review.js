import express from 'express'
import { createReviews, getReviews } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post('/', createReviews);
reviewRouter.get('/:courseId', getReviews);

export default reviewRouter;