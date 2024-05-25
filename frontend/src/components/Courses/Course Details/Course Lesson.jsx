import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../../Common/Header";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useSelector } from "react-redux";

const CourseLesson = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState([]);
  console.log(lessons);
  console.log(lessons._id);
  console.log(lesson);
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`/api/lesson/${courseId}`);
        setLessons(response.data);
        console.log(lessons[0]._id); // Now logs _id after data is fetched
      } catch (error) {
        console.error(error);
      }
    };

    fetchLessons();
  }, [courseId]);

  useEffect(() => {
    if (lesson.length > 0) {
      const fetchSpecificLesson = async () => {
        try {
          const response = await axios.get(
            `/api/lesson/${courseId}/${lessons[0]._id}`
          );
          setLesson(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchSpecificLesson();
    }
  }, [courseId, lesson]);

  if (lessons.length === 0) {
    return <div>No lessons found for this course.</div>;
  }

  return (
    <div className="flex min-h-screen  ">
      <div className="fixed top-0 left-0 w-full bg-white z-10">
        <Header />
      </div>

      <div className="fixed top-32 left-0 h-screen w-[200px]  border-gray-300 bg-slate-100 z-10 p-4">
        {lessons.map((lesson, index) => (
          <Link
            key={index}
            to={`/course-lesson/${courseId}/${lesson._id}`}
            className={`block py-2 hover:bg-gray-200 ${
              index === 0 ? "text-blue-500 font-bold" : ""
            }`}
          >
            <DoneAllIcon className=" mr-1" /> {lesson.title}
          </Link>
        ))}
      </div>

      {/* Main content area */}
      <div className="flex flex-col justify-center items-center mx-auto pt-36">
        {" "}
        {/* Adjust padding as needed */}
        {lessons.map((lesson, index) => (
          <div key={index} className="mb-6">
            <div className="flex gap-14 h-screen">
              {" "}
              {/* Remove if not needed */}
              <div className="mt-10 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">{lesson.title}</h2>
                <p className="mb-4">{lesson.description}</p>

                {/* Display the video if available */}
                <div className=" ">
                  <video
                    className="border h-[360px] w-[640px]"
                    width="640"
                    height="360"
                    controls
                  >
                    <source src={lesson.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Display the document content */}
                <div className="my-4">
                  <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                </div>

                {/* Links to quiz and assignment pages */}
                <div className="flex ">
                  <Link
                    to={`/lessons/${lesson._id}/quiz`} // Use lesson._id for the link
                    className="bg-purple-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    View Quiz
                  </Link>
                  <Link
                    to={`/lessons/${lesson._id}/assignment`} // Use lesson._id for the link
                    className="bg-blue-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    View Assignment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseLesson;
