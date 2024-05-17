import { json } from "express";
import errorHandler from "../Utils/error.js";
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
    userRef,
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
    userRef,
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

export const personalcourses = async (req, res, next) =>{
  if(req.user.id == req.params.id) {
    try {
      const courses = await Course.find({userRef: req.params.id});
      res.status(200).json(courses)
    } catch (error) {
      next(error)
    }
  }
}

export const deletecourses = async (req, res, next) => {

  const listing = await Course.findById(req.params.id)

  if(!listing) {
    return next (errorHandler(404, "Course not found!"))
  }

  if(req.user.id !== listing.userRef) {
    return next (errorHandler (401,'You can only delete your own course!'))
  }

  try {
    await Course.findByIdAndDelete(req.params.id)
  } catch (error) {
    next(error)
  }
}