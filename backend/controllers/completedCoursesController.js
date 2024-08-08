// controllers/completedCoursesController.js

import CompletedCourse from "../models/CompletedCourse.js";



export const addCompletedCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Check if the course already exists
    const existingCourse = await CompletedCourse.findOne({ userId, courseId });

    if (existingCourse) {
      return res.status(400).send({ message: "Course already completed" });
    }

    const completedCourse = new CompletedCourse({
      userId,
      courseId
    });

    await completedCourse.save();
    res.status(201).send(completedCourse);
  } catch (error) {
    res.status(500).send({ error: "Error saving completed course" });
  }
};

export const getCompletedCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    const completedCourses = await CompletedCourse.find({ userId }).populate('courseId');
    res.status(200).send(completedCourses);
  } catch (error) {
    res.status(500).send({ error: "Error fetching completed courses" });
  }
};