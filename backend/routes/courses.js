import express from "express";
import { courses, createCourses,deletecourses, personalcourses, catagory, createCatagory } from "../controllers/coursesController.js";
import { verifyToken } from "../Utils/verifyUser.js";
const courseRouter = express.Router();

courseRouter.get("/courses", courses);
courseRouter.post("/createCourses", verifyToken, createCourses);
courseRouter.delete("/deletecourses/:id",verifyToken, deletecourses);
courseRouter.get("/personalcourses/:id",verifyToken, personalcourses);
courseRouter.post("/createCatagory", createCatagory);
courseRouter.get("/catagory", catagory);


export default courseRouter;