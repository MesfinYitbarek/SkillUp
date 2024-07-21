
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
      const { userId } = req.params.userId;
      const {courseId} = req.params.courseId
      const scores = await Score.find({userId :userId, courseId: courseId})
      res.status(200).json(scores);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching scores', error });
    }
  };