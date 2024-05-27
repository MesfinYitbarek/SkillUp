import errorHandler from "../Utils/error.js";
import Enrollment from "../models/Enrollment.js";

export const enrollment = async (req, res, next) => {
  try {
    const newEnrollment = new Enrollment({
      username: req.body.username,
      email: req.body.email,
      courseId: req.body.courseId,
      courseName: req.body.courseName,
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

//display enrolled students for instructor
export const enrolledStudents = async (req, res, next) => {
  try {
    const userId = req.params.userId; 
    const enrollments = await Enrollment.find({ courseId: userId }); 
    res.json(enrollments);
  } catch (error) {
    next(error);
  }
};

//response true or false for user based on enrollment
export const isEnrolled = async (req, res) => {
  const { username, courseId } = req.body;

  if (!username || !courseId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const isEnrolled = await Enrollment.exists({ username, courseId });
    res.json({ isEnrolled });
  } catch (err) {
    console.error("Error checking enrollment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}