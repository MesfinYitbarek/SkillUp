import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuizApp() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState([]);
  const [username, setUsername] = useState('');
  const [result, setResult] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [points, setPoints] = useState(0);
  const [achieved, setAchieved] = useState(false);

  useEffect(() => {
    fetchQuestions();
    fetchResults();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/results');
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:4500/api/results', {
        username,
        result,
        attempts,
        points,
        achived: achieved,
      });
      setResult(0);
      setAttempts(0);
      setPoints(0);
      setAchieved(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Quiz App</h1>
  
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="border-2 border-gray-300 rounded-md px-3 py-2 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
  
        {questions && questions.length > 0 ? (
          questions.map((question, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-lg font-medium mb-2">{question.question}</h2>
              {question.answers.map((answer, i) => (
                <div key={i} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`answer-${index}-${i}`}
                    name={`question-${index}`}
                    className="mr-2"
                    checked={answers[index] === i}
                    onChange={() => {
                      const newAnswers = [...answers];
                      newAnswers[index] = i;
                      setAnswers(newAnswers);
                    }}
                  />
                  <label htmlFor={`answer-${index}-${i}`} className="text-gray-700">
                    {answer}
                  </label>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>Loading questions...</p>
        )}
  
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
  
}

export default QuizApp;
