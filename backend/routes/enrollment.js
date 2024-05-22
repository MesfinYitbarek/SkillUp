import express from "express";
import { enrolledStudents, enrollment, enrollmentDisplay } from "../controllers/enrollmentController.js";
import { verifyToken } from "../Utils/verifyUser.js";

const enrollmentRouter = express.Router();

enrollmentRouter.get("/enrollmentDisplay", enrollmentDisplay);
enrollmentRouter.post("/enrollment",verifyToken, enrollment);
enrollmentRouter.get("/enrolledStudents/:userId",verifyToken, enrolledStudents);

export default enrollmentRouter;