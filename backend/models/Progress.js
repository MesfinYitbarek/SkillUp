import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
   
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
        lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
        progress: { type: Number, required: true },
      });
  
  const Progress = mongoose.model('Progress', ProgressSchema);
  export default Progress