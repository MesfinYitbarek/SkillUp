import Quiz from '../models/Quiz.js'
import errorHandler from '../Utils/error.js';

export const createQuiz = async (req, res, next) => {
    try {
      const { lessonId, questions } = req.body;
      const quiz = new Quiz({ lessonId, questions });
      await quiz.save();
      res.status(201).json(quiz);
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Handle Mongoose validation errors (e.g., required fields missing)
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: 'Validation errors', errors: validationErrors });
      }
      next(error); // Pass other errors to centralized error handling
    }
  };
  

export const getQuizByLessonId = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const quiz = await Quiz.findOne({ lessonId });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz', error });
  }
};



// New method for handling quiz submissions
export const submitQuiz = async (req, res) => {
    try {
      const { lessonId } = req.params;
      const {  answers } = req.body;
      const quiz = await Quiz.findOne({ lessonId });
  
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      let score = 0;
      quiz.questions.forEach((question, index) => {
        if (question.correctAnswer === answers[index]) {
          score += 1;
        }
      });
  
      const result = {
        score,
        totalQuestions: quiz.questions.length,
      };
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error submitting quiz', error });
    }
  };