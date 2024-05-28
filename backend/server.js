import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import courseRouter from "./routes/courses.js";
import Contact from "./models/Contact.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import contactRouter from "./routes/contact.js";
import enrollmentRouter from "./routes/enrollment.js";
import lessonRouter from "./routes/lesson.js";
import discussionRouter from "./routes/discussion.js";
import { Server as SocketIOServer } from "socket.io";
import http from "http";
import quizRouter from "./routes/quiz.js";

dotenv.config();

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("joinLessonRoom", (lessonId) => {
    socket.join(lessonId);
  });

  socket.on("newComment", (data) => {
    io.to(data.lessonId).emit("receiveComment", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/contact", contactRouter);
app.use("/api/enrollment", enrollmentRouter);
app.use("/api/lesson", lessonRouter);
app.use("/api/discussion", discussionRouter);
app.use("/api/quiz", quizRouter);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});