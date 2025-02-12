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
import scoreRouter from "./routes/score.js";
import assignmentRouter from "./routes/assignment.js";
import reviewRouter from "./routes/review.js";
import Course from "./models/Course.js";
import progressrouter from "./routes/progress.js";
import completedrouter from "./routes/completed.js";
import path from "path"
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

  const __dirname = path.resolve();

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

  socket.on('newReply', (reply) => {
    io.to(reply.parentId).emit('receiveReply', reply);
  });
  
  socket.on("newMessage", async (message) => {
    const messageCount = await Contact.countDocuments({ status: 'new' });
    io.emit("updateMessageCount", { count: messageCount });
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
app.use("/api/review", reviewRouter);
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/contact", contactRouter);
app.use("/api/enrollment", enrollmentRouter);
app.use("/api/lesson", lessonRouter);
app.use("/api/discussion", discussionRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/assignment", assignmentRouter);
app.use('/api/scores', scoreRouter);
app.use('/api/progress', progressrouter);
app.use('/api/completed-courses', completedrouter);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})
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