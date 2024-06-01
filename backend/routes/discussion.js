import express from 'express';
import { getDiscussion, createComment, replay } from '../controllers/discussionController.js';
const discussionRouter = express.Router();

discussionRouter.get('/:lessonId', getDiscussion);
discussionRouter.post('/:lessonId', createComment);
discussionRouter.post('/reply/:commentId', replay);
export default discussionRouter;