import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  instructorImage: {
    type: String,
    required: true,
  }, 
  rating: {
    type: Number,
    default: 0,
  }, 
  duration: {
    type: String,
    required: true,
  }, 
  isPaid: {
    type: Boolean,
    required: true,
  }, 
  price: {
    type: Number,
    required: true,
  }, // Price for paid courses (optional for free courses)
  
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
