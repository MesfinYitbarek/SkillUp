import express from "express";
import { courses, createCourses, catagory, createCatagory } from "../controllers/coursesController.js";
const courseRouter = express.Router();

courseRouter.get("/courses", courses);
courseRouter.post("/createCourses", createCourses);
courseRouter.post("/createCatagory", createCatagory);
courseRouter.get("/catagory", catagory);


export default courseRouter;