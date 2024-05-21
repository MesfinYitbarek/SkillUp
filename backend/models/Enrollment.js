import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,   
  },
  courseId: {
    type: String,
    required: true,   
  },
  courseName: {
    type: String,
    required: true,   
  },
}, { timestamps: true }); 

const Enrollment= mongoose.model('Enrollment', EnrollmentSchema);
export default Enrollment
