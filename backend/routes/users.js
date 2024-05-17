import express from "express";
import { test } from "../controllers/userController.js";
import { verifyToken } from "../Utils/verifyUser.js";
import { updateUser, deleteAdmin, updateAdmin } from "../controllers/userController.js";
import { deleteUser } from "../controllers/userController.js";
import { users } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/users", users);
userRouter.post('/update/:id', verifyToken, updateUser)
userRouter.delete('/delete/:id', verifyToken, deleteUser)
userRouter.post('/updateAdmin/:id', verifyToken, updateAdmin)
userRouter.delete('/deleteAdmin/:id', verifyToken, deleteAdmin)
export default userRouter;
