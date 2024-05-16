import express from "express";
import {contactDisplay, contact } from "../controllers/contactController.js";
const contactRouter = express.Router();

contactRouter.get("/contactDisplay", contactDisplay);
contactRouter.post("/contact", contact);


export default contactRouter;