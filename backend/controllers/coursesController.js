import Course from "../models/Course.js";

export const courses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

export const createCourses = async (req, res, next) => {
  const {
    title,
    imageUrl,
    instructorImage,
    description,
    duration,
    isPaid,
    price,
    rating,
  } = req.body;
  const newCourse = new Course({
    title,
    imageUrl,
    instructorImage,
    description,
    duration,
    isPaid,
    price,
    rating,
  });
  try {
    await newCourse.save();
    res.status(201).json("Course created successfull");
  } catch (error) {
    next(error);
  }
};
