import Progress from '../models/Progress';

const express = require('express');


const router = express.Router();

// Update progress for a specific lesson
export const updateProgress = async (req, res) => {
    const { userId } = req.user;
    const { courseId, lessonId } = req.params;
    const { progress } = req.body;
  
    try {
      let progressDoc = await Progress.findOne({ userId, courseId, lessonId });
      if (progressDoc) {
        progressDoc.progress = progress;
        await progressDoc.save();
      } else {
        progressDoc = new Progress({ userId, courseId, lessonId, progress });
        await progressDoc.save();
      }
      res.json(progressDoc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Retrieve user progress for a specific course
export const getProgress =  async (req, res) => {
    const { userId } = req.user;
    const { courseId, lessonId } = req.params;
  
    try {
      const progress = await Progress.findOne({ userId, courseId, lessonId });
      if (progress) {
        res.json(progress);
      } else {
        res.status(404).json({ message: 'Progress not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };