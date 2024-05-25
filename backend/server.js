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
import router from "./routes/route.js";
import path from 'path';
import { fileURLToPath } from 'url';
import assignmentRoutes from './routes/assignmentRouter.js';
import fs from 'fs'; 
dotenv.config();

// To resolve __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if 'uploads' directory exists, and create it if it doesn't
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
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
/// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(uploadsDir));

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

// Routes
app.use('/api/assignments', assignmentRoutes);

//Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api",router)
app.post("/api/contact", async (req, res) => {
  try {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    await newContact.save(); // Save contact data to MongoDB

    res
      .status(201)
      .json({ message: "Contact information submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting contact information" });
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
