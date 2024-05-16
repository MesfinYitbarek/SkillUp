import Catagory from "../models/Catagory.js";
import Course from "../models/Course.js";

export const courses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

export const catagory = async (req, res, next) => {
  try {
    const catagory = await Catagory.find();
    res.json(catagory);
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

export const createCatagory = async (req, res, next) => {
  const { name, labelName } = req.body;
  const newCatagory = new Catagory({
    name,
    labelName,
  });
  try {
    await newCatagory.save();
    res.status(201).json("Catagory created successfull");
  } catch (error) {
    next(error);
  }
};

