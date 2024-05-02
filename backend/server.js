import express, { request } from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to this page.");
});

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
