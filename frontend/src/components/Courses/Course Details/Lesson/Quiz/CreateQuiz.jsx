import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../../../../Common/Header";
import Footer from "../../../../Common/Footer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);

  const { lessonId, courseId } = useParams();

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const removeQuestion = (questionIndex) => {
    if (questions.length > 1) {
      const newQuestions = [...questions];
      newQuestions.splice(questionIndex, 1);
      setQuestions(newQuestions);
    } else {
      alert("You cannot remove the last question.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const maxAttempts = parseInt(document.getElementById("maxAttempts").value);
      const timeLimit = parseInt(document.getElementById("timeLimit").value);

      if (isNaN(maxAttempts) || isNaN(timeLimit)) {
        alert("Please enter valid numbers for maximum attempts and time limit.");
        return;
      }

      await axios.post("/api/quiz/create", {
        lessonId,
        questions,
        maxAttempts,
        timeLimit,
      });
      alert("Quiz created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating quiz");
    }
  };

  return (
    <div className="relative bg-slate-50 min-h-screen">
      <Header />
      <div className="flex flex-col items-center">
        <div className="bg-white shadow-md rounded-lg p-6 m-8 mt-6 w-full max-w-3xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Question {qIndex + 1}</h3>
                <div className="mb-4">
                  <label
                    htmlFor={`questionText-${qIndex}`}
                    className="block font-semibold text-gray-700 mb-2"
                  >
                    Question Text:
                  </label>
                  <input
                    type="text"
                    id={`questionText-${qIndex}`}
                    value={question.questionText}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, "questionText", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <h4 className="text-base font-semibold mb-2">Options:</h4>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center mb-2">
                      <label
                        htmlFor={`option-${qIndex}-${oIndex}`}
                        className="text-gray-700 mr-2"
                      >
                        Option {oIndex + 1}:
                      </label>
                      <input
                        type="text"
                        id={`option-${qIndex}-${oIndex}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor={`correctAnswer-${qIndex}`}
                    className="block font-semibold text-green-700 mb-2"
                  >
                    Correct Answer:
                  </label>
                  <input
                    type="text"
                    id={`correctAnswer-${qIndex}`}
                    value={question.correctAnswer}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, "correctAnswer", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Remove Question
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Question
            </button>
            <div className="mb-4">
              <label
                htmlFor="maxAttempts"
                className="block font-semibold text-gray-700 mb-2"
              >
                Maximum Attempts:
              </label>
              <input
                type="number"
                id="maxAttempts"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="timeLimit"
                className="block font-semibold text-gray-700 mb-2"
              >
                Time Limit (minutes):
              </label>
              <input
                type="number"
                id="timeLimit"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Quiz
            </button>
          </form>
          <div className="flex justify-between font-bold mt-6">
            <Link to={`/create-lesson/${courseId}`} className="text-blue-800 hover:underline">
              Back
            </Link>
            <div className="flex gap-6">
              <Link to={`/create-assignment/${lessonId}`} className="text-blue-800 hover:underline">
                Skip <NavigateNextIcon />
              </Link>
              <Link to="/instructor" className="text-blue-800 hover:underline">
                Finish
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateQuiz;