import express from "express";
import { courses, createCourses,deletecourses,enrolledCourses,updatecourses, personalcourses,deletecatagory,updatecatagory, catagory, createCatagory, deletecoursesByAdmin, courseDetails, catagoryEdit, courseEdit, courseCatagory } from "../controllers/coursesController.js";
import { verifyToken } from "../Utils/verifyUser.js";
const courseRouter = express.Router();

courseRouter.get("/courses", courses);
courseRouter.get("/courseCatagory:categoryName", courseCatagory);
courseRouter.get("/courseEdit/:id", courseEdit);
courseRouter.get("/courseDetails/:id", courseDetails);
courseRouter.get("/enrolledCourses/:username", enrolledCourses);
courseRouter.post("/createCourses", verifyToken, createCourses);
courseRouter.delete("/deletecourses/:id",verifyToken, deletecourses);
courseRouter.delete("/deletecoursesByAdmin/:id",verifyToken, deletecoursesByAdmin);
courseRouter.post("/updatecourses/:id",verifyToken, updatecourses);
courseRouter.get("/personalcourses/:id",verifyToken, personalcourses);
courseRouter.post("/createCatagory", createCatagory);
courseRouter.get("/catagory", catagory);
courseRouter.get("/catagory/:id", catagoryEdit);
courseRouter.delete("/deletecatagory/:id",verifyToken, deletecatagory);
courseRouter.post("/updatecatagory/:id",verifyToken, updatecatagory);


export default courseRouter;