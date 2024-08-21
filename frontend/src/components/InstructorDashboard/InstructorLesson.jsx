import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { FaPlus } from "react-icons/fa6";
import { Checkbox } from "@mui/material";

const InstructorLesson = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`/api/lesson/${courseId}`);
        setLessons(response.data);
      } catch (error) {
        console.error(error);
        setError("Error fetching lessons");
      }
    };

    fetchLessons();
  }, [courseId]);

  const handleDeleteLesson = async (lessonId) => {
    try {
      const response = await axios.delete(`/api/lesson/${lessonId}`);

      if (response.data.success) {
        setLessons(lessons.filter((lesson) => lesson._id !== lessonId));
      } else {
        setError("Error deleting lesson");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting lesson");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 px-5 sm:px-20">
        <div className="max-w-7xl mx-auto">
          <Link
            to={`/create-lesson/${courseId}`}
            className="inline-flex items-center gap-2 font-bold border-blue-800 text-blue-800 border p-2 px-4 rounded-sm mb-4"
          >
            <FaPlus /> Create Lesson
          </Link>
          <div className="bg-white rounded-md shadow-md overflow-x-auto">
            <table className="w-full text-blue-800 border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="p-3 text-left">Lesson Title</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((data) => (
                  <tr key={data._id} className="font-semibold hover:bg-gray-200">
                    <td className="p-2">
                      <Checkbox /> {data.title}
                    </td>
                    <td className="p-2 space-x-3 sm:space-x-12">
                      <Link to={`/lesson-edit/${data._id}`} className="text-blue-600 hover:text-blue-800">Edit</Link>
                      <button onClick={() => handleDeleteLesson(data._id)} className="text-red-600 hover:text-red-800">Delete</button>
                      <Link to={`/quiz/${data._id}`} className="text-green-600 hover:text-green-800">Quiz</Link>
                      <Link to={`/create-assignment/${data._id}`} className="text-purple-600 hover:text-purple-800">Assignment</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InstructorLesson;