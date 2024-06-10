import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../../../Common/Header";
import Footer from "../../../../Common/Footer";

const Quiz = () => {
  const { lessonId, courseId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const { currentUser } = useSelector((state) => state.user);
  const [isStarted, setIsStarted] = useState(false);
  const [timerId, setTimerId] = useState(null);
  console.log(lessonId);
  console.log(courseId);
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/quiz/${lessonId}`);
        setQuiz(response.data);
        setTimeLeft(response.data.timeLimit * 60);
        setAnswers(new Array(response.data.questions.length).fill(""));
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuiz();
  }, [lessonId, currentUser._id]);

  const handleStartQuiz = () => {
    setIsStarted(true);
  };

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      setTimerId(timerId);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [isStarted, timeLeft]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Clear the timer before submitting
    clearInterval(timerId);

    try {
      const response = await axios.post(`/api/quiz/${lessonId}/submit`, {
        courseId,
        answers,
        userId: currentUser._id,
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <Header />

        <div className="p-8 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
          {quiz ? (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {quiz.lessonId.title} Quiz
              </h2>
              <div className="mb-4 text-red-500">
                Time Left: {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
              </div>
              {!isStarted && (
                <button
                  onClick={handleStartQuiz}
                  className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                >
                  Start Quiz
                </button>
              )}
            </div>
          ) : (
            <div className=" p-10 m-10  text-2xl text-blue-600 font-bold bg-slate-50">Quiz not found</div>
          )}

          {isStarted && (
            <form onSubmit={handleSubmit}>
              {quiz.questions.map((question, index) => (
                <div key={index} className="mb-6">
                  <label className="block text-lg font-medium mb-2">
                    {index + 1}. {question.questionText}
                  </label>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="mb-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          onChange={(e) =>
                            handleAnswerChange(index, e.target.value)
                          }
                          className="form-radio"
                        />
                        <span className="ml-2">{option}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              >
                Submit Quiz
              </button>
            </form>
          )}
          {result && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
              <h3 className="text-xl font-semibold mb-2">Quiz Result</h3>
              <p className="mb-2">Score: {result.score}</p>
              <p className="mb-2 flex flex-col">
                Correct Answers:{" "}
                {result.correctAnswers.map((answer, index) => (
                  <p key={index}>
                    {index + 1}, {answer}
                  </p>
                ))}
              </p>
              <p>Maximum Attempts: {quiz.maxAttempts}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Quiz;
