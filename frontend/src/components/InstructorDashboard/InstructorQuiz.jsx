import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { FaPlus } from "react-icons/fa6";

const InstructorQuiz = () => {
  const { lessonId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/quiz/${lessonId}`);
        setQuiz(response.data);
      } catch (error) {
        console.error(error);
        setError("Error fetching quiz");
      }
    };

    fetchQuiz();
  }, [lessonId]);

  const handleDeleteQuiz = async (quizId) => {
    try {
      const response = await axios.delete(`/api/quiz/delete/${quizId}`);

      if (response.data.success) {
        setQuiz(null);
      } else {
        setError("Error deleting Quiz");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting Quiz");
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-grow p-4 sm:px-20 px-5">
        <div className="max-w-7xl mx-auto">
          <Link
            to={`/courses/:courseId/${lessonId}/quiz/create`}
            className="inline-flex items-center gap-2 border-blue-800 text-blue-800 border font-bold p-2 px-4 rounded-sm mb-4"
          >
            <FaPlus />Create Quiz
          </Link>
          <div className="bg-white rounded-md shadow-md overflow-x-auto">
            <table className="w-full text-blue-800 border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="p-2 text-left">Quiz Title</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quiz && (
                  <tr className="font-semibold hover:bg-gray-200">
                    <td className="p-2">{quiz._id}</td>
                    <td className="p-2 space-x-2">
                      <Link to={`/quiz-edit/${quiz._id}`} className="text-blue-600 hover:text-blue-800">Edit</Link>
                      <button onClick={() => handleDeleteQuiz(quiz._id)} className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InstructorQuiz;