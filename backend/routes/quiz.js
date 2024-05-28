
import express from 'express'
import { createQuiz, getQuizByLessonId, submitQuiz } from '../controllers/quizController.js';

const quizRouter = express.Router();

quizRouter.post('/create', createQuiz);
quizRouter.get('/:lessonId', getQuizByLessonId);
quizRouter.post('/:lessonId/submit', submitQuiz);

export default quizRouter;