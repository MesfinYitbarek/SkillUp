import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
const InstructorQuiz = () => {

  const { lessonId } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`/api/quiz/${lessonId}`);
        setQuiz(response.data);
        if (response.data.length > 0) {
          setSelectedQuiz(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLessons();
  }, [lessonId,quiz]);

  const handleDeleteQuiz= async (quizId) => {
    try {
      const response = await axios.delete(`/api/quiz/delete/${quizId}`);

      if (response.data.success) {
        setQuiz([...quiz.filter((lesson) => quiz._id !== quizId)]);
      } else {
        setError("Error deleting Quiz ");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting Quiz ");
    }
  };

  return (
    <div>
      <div>
        <div>
          <Header />
        </div>
        <div>
          <div className=" m-10 flex flex-col justify-center items-center">
            <div>
            <Link to={`/courses/:courseId/${lessonId}/quiz/create`} 
                        className=" border-blue-600 text-blue-600 border bg-blue-50 p-1 px-3  text-center mt-4 rounded-sm"
                        >Create Quiz</Link>
            </div>
            <table className="  text-sky-900   border-separate border-spacing-y-2 min-w-[800px]">
              <tr className=" ">
                <td className=" text-blue-700 font-bold text-xl ">
                 Quiz 
                </td>
                <td></td>
              </tr>
              <tr className=" bg-blue-400   font-semibold text-white ">
                <td className="p-2">Quiz Title</td>
                <td></td>
                <td></td>
              </tr>
              {quiz && (
                <tr className=" even:bg-slate-100 ">
                  <td className=" p-1">{quiz._id}
                    </td>
                  <td><Link to={`/quiz-edit/${quiz._id}`}>Edit</Link></td>
                  <td><button onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button></td>
                </tr>
              )}
            </table>
          </div>
        </div>
        <div>
            <Footer/>
        </div>
      </div>
    </div>
  );
};

export default InstructorQuiz;
