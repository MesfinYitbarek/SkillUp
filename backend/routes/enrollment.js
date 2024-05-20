import express from "express";
import { enrollment } from "../controllers/enrollmentController.js";
import { verifyToken } from "../Utils/verifyUser.js";

const enrollmentRouter = express.Router();

enrollmentRouter.post("/enrollment", enrollment);

export default enrollmentRouter;