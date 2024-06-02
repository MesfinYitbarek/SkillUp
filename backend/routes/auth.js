import express from "express";
import { google, signin, signup, signout, changePassword } from "../controllers/authController.js";
import { verifyToken } from "../Utils/verifyUser.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/google", google);
authRouter.put('/:userId/change-password',verifyToken, changePassword);
authRouter.get("/signout", signout);

export default authRouter;
