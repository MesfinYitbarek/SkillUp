import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
const InstructorLesson = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`/api/lesson/${courseId}`);
        setLessons(response.data);
        if (response.data.length > 0) {
          setSelectedLesson(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLessons();
  }, [courseId,lessons]);

  const handleDeleteLesson = async (lessonId) => {
    try {
      const response = await axios.delete(`/api/lesson/${lessonId}`);

      if (response.data.success) {
        setLessons([...lessons.filter((lesson) => lesson._id !== lessonId)]);
      } else {
        setError("Error deleting Lesson ");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting lesson ");
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
            <Link to={`/create-lesson/${courseId}`} 
                        className=" border-blue-600 text-blue-600 border bg-blue-50 p-1 px-3  text-center mt-4 rounded-sm"
                        >Create Lesson</Link>
            </div>
            <table className="  text-sky-900   border-separate border-spacing-y-2 min-w-[800px]">
              <tr className=" ">
                <td className=" text-blue-700 font-bold text-xl ">
                 Lessons 
                </td>
                <td></td>
              </tr>
              <tr className=" bg-blue-400   font-semibold text-white ">
                <td className="p-2">Lesson Title</td>
                <td></td>
                <td></td>
              </tr>
              {lessons.map((data) => (
                <tr className=" even:bg-slate-100 ">
                  <td className=" p-1">{data.title}</td>
                  <td><Link to={`/lesson-edit/${data._id}`}>Edit</Link></td>
                  <td><button onClick={() => handleDeleteLesson(data._id)}>Delete</button></td>
                  <td><Link to={`/quiz/${data._id}`}>Quiz</Link></td>
                  <td><Link to={`/create-assignment/${data._id}`}>Assignment</Link></td>
                </tr>
              ))}
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

export default InstructorLesson;
