import express, { request } from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import cors from 'cors'

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
app.use(express.json())
app.use(cors())

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
