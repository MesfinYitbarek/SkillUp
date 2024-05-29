// routes/scoreRoutes.js
import express from 'express';
import { getScores, getScoresByUserId } from '../controllers/scoreController.js';


const scoreRouter = express.Router();

scoreRouter.get('/', getScores);
scoreRouter.get('/:courseId', getScoresByUserId);

export default scoreRouter;