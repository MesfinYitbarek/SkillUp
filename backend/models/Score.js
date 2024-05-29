// models/Score.js
import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
});

const Score = mongoose.model('Score', scoreSchema);
export default Score;