// models/Assignment.js
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  assignmentTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  fileUrl: {
    type: String,
  },
  StudentId: {
    type: String,
  },
  StudentName: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
