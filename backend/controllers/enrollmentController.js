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

//display enrolled students for instructor
export const enrolledStudents = async (req, res, next) => {

  //try {
    //const enrollment = await Enrollment.find({courseId: req.params.id });
    //const enrollment = await Enrollment.find({ courseId: req.params.id }).populate('user', 'username email'); 
    //const enrolledStudents = enrollment.map((enrollment) => ({
     // username: enrollment.user.username,
     // email: enrollment.user.email,
      // Add other relevant student information
   // }));
    //res.json(enrolledStudents);
    try {
      const userId = req.params.userId;
  
      // Find enrollments for the instructor (using userId)
      const enrollments = await Enrollment.find({ user: userId })
        .populate('user', 'username email') // Populate user details
        .populate('course', 'title'); // Populate course title
  
      const enrolledStudents = enrollments.map((enrollment) => ({
        username: enrollment.user.username,
        email: enrollment.user.email,
        courseId: enrollment.courseId, // Assuming course has an _id field
        courseName: enrollment.title,
      }));
  
      res.json(enrolledStudents);
    
  } catch (error) {
    next(error);
  }

};