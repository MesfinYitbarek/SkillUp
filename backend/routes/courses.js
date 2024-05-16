import express from "express";
import { courses, createCourses } from "../controllers/coursesController.js";

const courseRouter = express.Router();

courseRouter.get("/courses", courses);
courseRouter.post("/createCourses", createCourses);


export default courseRouter;