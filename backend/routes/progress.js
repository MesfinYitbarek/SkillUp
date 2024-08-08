import express from "express";
import { getProgress,  updateProgress } from "../controllers/progressController.js";
import { verifyToken } from "../Utils/verifyUser.js";


const progressrouter = express.Router();
// Assuming you have an auth middleware

progressrouter.get('/:userId/:courseId',verifyToken, getProgress);
progressrouter.post('/:userId/:courseId/:lessonId',verifyToken,updateProgress);



export default progressrouter
