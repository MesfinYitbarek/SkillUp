import express from "express";
import { courses } from "../controllers/coursesController.js";

const courseRouter = express.Router();

courseRouter.post("/courses", courses);


export default courseRouter;