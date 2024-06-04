import express from "express";
import { create, getassignmentByLessonId, submit } from "../controllers/assignmentController.js";

const assignmentRouter = express.Router();

assignmentRouter.post("/create", create);
assignmentRouter.post("/submit", submit);
assignmentRouter.get("/:lessonId", getassignmentByLessonId)

export default assignmentRouter;
