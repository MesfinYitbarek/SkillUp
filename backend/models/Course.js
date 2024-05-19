import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  instructorImage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  catagory: {
    type: String,
    required: true,
    default: "Computer Science",
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  userRef: {
    type:String,
    required:true,
  },
}, {timestamps: true});

const Course = mongoose.model('Course', courseSchema);


export default Course;
