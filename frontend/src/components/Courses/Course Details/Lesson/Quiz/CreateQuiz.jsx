import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../../../../Common/Header";
import Footer from "../../../../Common/Footer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { NextPlan } from "@mui/icons-material";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);
  
  const { lessonId } = useParams(); // Get lessonId from URL params (optional)
  const { courseId } = useParams();
  console.log(lessonId)
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



      await axios.post("/api/quiz/create", {lessonId,questions, maxAttempts, timeLimit});
      alert("Quiz created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating quiz");
    }
  };

  return (
    <div className="relative bg-slate-50">
      <Header />
      <div>
        <div className="flex flex-col items-center">
          <div className="z-10 bg-white shadow-md rounded-lg p-4 m-14 mt-6 space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col p-10 px-40 space-y-4">
              {questions.map((question, qIndex) => (
                <div key={qIndex} className="bg-slate-50 p-10">
                  <h3 className="text-lg font-bold mb-2">Question {qIndex + 1}</h3>
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
                          htmlFor={`option-<span class="math-inline">\{qIndex\}\-</span>{oIndex}`}
                          className="text-gray-700 mr-2"
                        >
                          Option {oIndex + 1}:
                        </label>
                        <input
                          type="text"
                          id={`option-<span class="math-inline">\{qIndex\}\-</span>{oIndex}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(qIndex, oIndex, e.target.value)
                          }
                          className="shadow appearance-none border rounded w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                      className="shadow appearance-none border rounded w-[59%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="flex justify-between items-center">
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
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline btn btn-primary mb-2 self-end"
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline btn btn-success self-end"
              >
                Create Quiz
              </button>
            </form>
            <div className="flex gap-7 font-bold px-10 justify-between">
              <Link to={`/create-lesson/${courseId}`}>Back </Link>
              <div className="flex gap-6">
                <Link to={`/create-assignment/${lessonId}`}>
                  <h1>Skip <NavigateNextIcon /></h1>
                </Link>
                <Link to={"/instructor"}>Finish </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateQuiz;
