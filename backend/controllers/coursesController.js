import  Course from "../models/Course.js"

export const courses = async (req, res, next) => {
  try {
    const courses = await Course.find().select('-__v'); // Exclude unnecessary field
    res.json(courses);
  } catch (error) {
    next(error)
  }
};
