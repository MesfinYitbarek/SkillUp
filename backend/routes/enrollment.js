import express from "express";
import { enrollment, enrollmentDisplay } from "../controllers/enrollmentController.js";
import { verifyToken } from "../Utils/verifyUser.js";

const enrollmentRouter = express.Router();

enrollmentRouter.get("/enrollmentDisplay", enrollmentDisplay);
enrollmentRouter.post("/enrollment", enrollment);

export default enrollmentRouter;