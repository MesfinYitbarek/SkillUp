import express from "express";
import { getProgress,  updateProgress } from "../controllers/progressController";
import { verifyToken } from "../Utils/verifyUser";
const progressRouter = express.Router();
progressRouter.post('/:courseId/:lessonId', verifyToken, updateProgress);
progressRouter.get('/:courseId/:lessonId', verifyToken, getProgress);

export default progressRouter
