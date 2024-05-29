import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Quiz = () => {
  const { lessonId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const {currentUser} = useSelector((state)=> state.user)
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/quiz/${lessonId}`);
        setQuiz(response.data);
        setAnswers(new Array(response.data.questions.length).fill(''));
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuiz();
  }, [lessonId]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/quiz/${lessonId}/submit`, { answers, userId: currentUser._id });
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-40'>
      <h2>{quiz.lessonId.title} Quiz</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question, index) => (
          <div key={index} className="mb-4">
            <label>{index + 1}. {question.questionText}</label>
            {question.options.map((option, oIndex) => (
              <div key={oIndex}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
                {option}
              </div>
            ))}
          </div>
        ))}
       <button type="submit" className="btn btn-primary">Submit Quiz</button>
      </form>
      {result && (
        <div>
          <h3>Your Score: {result.score} / {result.totalQuestions}</h3>
          <h4>Correct Answers:</h4>
          <ul>
            {result.correctAnswers.map((correctAnswer, index) => (
              <li key={index}>{index + 1}. {correctAnswer}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Quiz;