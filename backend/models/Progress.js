
import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  lessons: {
    type: Map,
    of: new mongoose.Schema({
      video: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      notes: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      quiz: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      assignment: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      }
    }, { _id: false })
  }
}, { timestamps: true });
  
  const Progress = mongoose.model('Progress', ProgressSchema);
  export default Progress