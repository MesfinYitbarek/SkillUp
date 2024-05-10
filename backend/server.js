import express, { request } from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import courseRouter from "./routes/courses.js"
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter )
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
