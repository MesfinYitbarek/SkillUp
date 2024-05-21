import errorHandler from "../Utils/error.js";
import Enrollment from "../models/Enrollment.js";

export const enrollment = async (req, res, next) => {
  try {
    const newEnrollment = new Enrollment({
      username: req.body.username,
      email: req.body.email,
      courseId: req.body.courseId,
      courseName:req.body.courseName,
    });

    await newEnrollment.save();

    res.status(201).json({ message: "Enrolled successfully!" });
  } catch (err) {
    next(err);
  }
};

//display enrolled students
export const enrollmentDisplay = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.find();
    res.json(enrollment);
  } catch (error) {
    next(error);
  }
};