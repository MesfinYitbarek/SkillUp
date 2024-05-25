import express from 'express';
import { createLesson, getLessonById, getLessonBylessonId,updateLesson, deleteLesson } from '../controllers/lessonController.js';

const lessonRouter = express.Router();
// Create a new lesson
lessonRouter.post('/create', createLesson);

// Get a lesson by ID
lessonRouter.get('/:courseId',getLessonById);

lessonRouter.get('/:courseId/:lessonId',getLessonBylessonId);

// Update a lesson
lessonRouter.put('/:lessonId', updateLesson);

// Delete a lesson
lessonRouter.delete('/:lessonId',deleteLesson);

export default lessonRouter;