// controllers/scoreController.js
import Score from '../models/Score.js';
import Lesson from '../models/Lesson.js';

export const getScores = async (req, res) => {
  try {
    const scores = await Score.find().populate('lessonId').populate('userId');
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scores', error });
  }
};

export const getScoresByUserId = async (req, res) => {
    try {
      const { userId, courseId } = req.query;
  
      const filter = {};
      if (userId) {
        filter.userId = userId;
      }
      if (courseId) {
        filter.courseId = courseId;
      }
  
      const scores = await Score.find(filter).populate('lessonId').populate('userId');
      res.status(200).json(scores);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching scores', error });
    }
  };