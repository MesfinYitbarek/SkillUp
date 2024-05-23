import express from "express";
import {contactDisplay,deletecontact, contact } from "../controllers/contactController.js";
import {newMessageCount} from "../controllers/contactController.js"
import { verifyToken } from "../Utils/verifyUser.js";

const contactRouter = express.Router();

contactRouter.get("/contactDisplay", contactDisplay);
contactRouter.get("/newMessageCount", newMessageCount);
contactRouter.post("/contact", contact);
contactRouter.delete("/delete/:id",verifyToken, deletecontact);

export default contactRouter;