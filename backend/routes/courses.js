import express from "express";
import { courses, createCourses,deletecourses,updatecourses,
     personalcourses,deletecatagory,updatecatagory, catagory,
      createCatagory, deletecoursesByAdmin } from "../controllers/coursesController.js";
import { verifyToken } from "../Utils/verifyUser.js";
const courseRouter = express.Router();

courseRouter.get("/courses", courses);
courseRouter.post("/createCourses", verifyToken, createCourses);
courseRouter.delete("/deletecourses/:id",verifyToken, deletecourses);
courseRouter.delete("/deletecoursesByAdmin/:id",verifyToken, deletecoursesByAdmin);
courseRouter.post("/update/:id",verifyToken, updatecourses);
courseRouter.get("/personalcourses/:id",verifyToken, personalcourses);
courseRouter.post("/createCatagory", createCatagory);
courseRouter.get("/catagory", catagory);
courseRouter.delete("/deletecatagory/:id",verifyToken, deletecatagory);
courseRouter.post("/updatecatagory/:id",verifyToken, updatecatagory);


export default courseRouter;