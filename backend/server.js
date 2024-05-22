import express, { request } from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import courseRouter from "./routes/courses.js";
import Contact from "./models/Contact.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import contactRouter from "./routes/contact.js";
import enrollmentRouter from "./routes/enrollment.js";
import router from "./routes/route.js";
dotenv.config();

// Connect to MongoDB database

const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });



// Middleware
app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

app.get("/",(req,res)=>{
  console.log("api working succesfully");
});

//Routes

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/contact", contactRouter)
app.use("/api/enrollment", enrollmentRouter)
app.use("/api/routes", router);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
