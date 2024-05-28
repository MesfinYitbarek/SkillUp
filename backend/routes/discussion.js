import express from 'express';
import { getDiscussion, createComment } from '../controllers/discussionController.js';
const discussionRouter = express.Router();

discussionRouter.get('/:lessonId', getDiscussion);
discussionRouter.post('/:lessonId', createComment);

export default discussionRouter;