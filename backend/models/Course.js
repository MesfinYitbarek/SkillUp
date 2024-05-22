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
  },
  instructor: {
    type: String,
  },
  requirements: {
    type: [String],
  },
  learningObjectives: {
    type: [String],
  },
  curriculum: {
    type: [Object], 
  },
  reviews: {
    type: String,
    default:"no data" ,
  },
  rating: {
    type: Number,
    required: true
  },
  level: {
    type: String,
    required: true,
  },
  userRef: {
    type:String,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {timestamps: true});

const Course = mongoose.model('Course', courseSchema);


export default Course;
