import express from "express";
import { enrolledStudents,isEnrolled, enrollment, enrollmentDisplay, deleteEnrolledStudent, enrolledStudentsByCourseId } from "../controllers/enrollmentController.js";
import { verifyToken } from "../Utils/verifyUser.js";

const enrollmentRouter = express.Router();

enrollmentRouter.get("/enrollmentDisplay",verifyToken, enrollmentDisplay);
enrollmentRouter.get("/:courseId",verifyToken, enrolledStudentsByCourseId);
enrollmentRouter.post("/enrollment",verifyToken, enrollment);
enrollmentRouter.get("/enrolledStudents/:userId",verifyToken, enrolledStudents);
enrollmentRouter.post("/isEnrolled", isEnrolled);
enrollmentRouter.delete("/delete/:id",verifyToken, deleteEnrolledStudent);
export default enrollmentRouter;