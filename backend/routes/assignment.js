import express from "express";
import { create, getassignmentByLessonId } from "../controllers/assignmentController.js";

const assignmentRouter = express.Router();

assignmentRouter.post("/create", create);
assignmentRouter.get("/:lessonId", getassignmentByLessonId)

export default assignmentRouter;
