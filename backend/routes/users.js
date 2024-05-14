import express from "express";
import { test } from "../controllers/userController.js";
import { verifyToken } from "../Utils/verifyUser.js";
import { updateUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.post('/update/:id', verifyToken, updateUser)

export default userRouter;
