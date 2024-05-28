import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { FaPlus, FaMinus } from "react-icons/fa";
import { storage } from "../../../../../firebase";
import { addLesson, setLessonId } from "../../../../redux/lesson/lesson"; // Import actions
import { useSelector, useDispatch } from "react-redux";
import Header from "../../../Common/Header";
import Footer from "../../../Common/Footer";
import img from "../../../../assets/background image/vectorstock_24205971.png";

const CreateLesson = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { loading, error } = useSelector((state) => state.user);

  const [lessons, setLessons] = useState([
    {
      title: "",
      description: "",
      videoFile: null,
      uploadProgress: 0,
      videoUrl: "",
      documentText: "",
    },
  ]);

  const handleLessonChange = (index, field, value) => {
    const newLessons = [...lessons];
    newLessons[index][field] = value;
    setLessons(newLessons);
  };

  const handleVideoFileChange = (index, event) => {
    const newLessons = [...lessons];
    newLessons[index].videoFile = event.target.files[0];
    setLessons(newLessons);
  };

  const addLesson = () => {
    setLessons([
      ...lessons,
      {
        title: "",
        description: "",
        videoFile: null,
        uploadProgress: 0,
        videoUrl: "",
        documentText: "",
      },
    ]);
  };

  const removeLesson = (index) => {
    const newLessons = lessons.filter((lesson, i) => i !== index);
    setLessons(newLessons);
  };

  const handleCreateLesson = async () => {
    try {
      for (const lesson of lessons) {
        if (!lesson.videoFile) {
          alert("Please select a video file for each lesson.");
          return;
        }

        if (lesson.videoFile.size > 1024 * 1024 * 1024) {
          alert("Video file size exceeds the limit (1 GB).");
          return;
        }

        const storageRef = ref(storage, `videos/${lesson.videoFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, lesson.videoFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            handleLessonChange(lessons.indexOf(lesson), "uploadProgress", progress);
          },
          (error) => {
            console.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            handleLessonChange(lessons.indexOf(lesson), "videoUrl", downloadURL);

            const response = await axios.post("/api/lesson/create", {
              title: lesson.title,
              description: lesson.description,
              videoUrl: downloadURL,
              content: lesson.documentText,
              course: courseId,
            });

            const lessonId = response.data._id;

            console.log(lessonId);
            if (lessonId) {
              navigate(`/courses/${courseId}/${lessonId}/quiz/create`);
            }
          }
        );
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading the video. Please try again.");
    }
  };

  return (
    <div className=" bg-slate-50">
      <div className=" fixed top-0 left-0 right-0">
        <Header />
      </div>
      <div className="mt-24 flex justify-center items-center">
        <div
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            //filter: "brightness(0.5)",
          }}
          className="text-blue-600 container mx-auto p-14 w-[70%] my-12 bg-sky-600 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Create Lesson</h2>

          {lessons.map((lesson, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg">
              <div className="mb-4">
                <label
                  htmlFor={`title-${index}`}
                  className="block text-gray-700 font-bold mb-2"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id={`title-${index}`}
                  placeholder="Lesson title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={lesson.title}
                  onChange={(e) =>
                    handleLessonChange(index, "title", e.target.value)
                  }
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor={`description-${index}`}
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description:
                </label>
                <textarea
                  placeholder="Short description about the lesson. Less than 100 words."
                  id={`description-${index}`}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={lesson.description}
                  maxLength={100}
                  onChange={(e) =>
                    handleLessonChange(index, "description", e.target.value)
                  }
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor={`videoFile-${index}`}
                  className="block text-gray-700 font-bold mb-2"
                >
                  Video:
                </label>
                <input
                  type="file"
                  id={`videoFile-${index}`}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => handleVideoFileChange(index, e)}
                />
                {lesson.videoFile && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-blue-500 h-2 rounded-full`}
                        style={{ width: `${lesson.uploadProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {lesson.uploadProgress}% Uploaded
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor={`documentText-${index}`}
                  className="block text-gray-700 font-bold mb-2"
                >
                  Document:
                </label>
                <textarea
                  id={`documentText-${index}`}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={lesson.documentText}
                  onChange={(e) =>
                    handleLessonChange(index, "documentText", e.target.value)
                  }
                />
              </div>

              <div className="flex justify-end mb-4">
                <button
                  onClick={() => removeLesson(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  <FaMinus className="inline" /> Remove Lesson
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between mb-4">
            <button
              onClick={addLesson}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <FaPlus className="inline" /> Add Lesson
            </button>
          </div>

          <div className="flex justify-between">
            <button
              disabled={loading}
              onClick={handleCreateLesson}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? "Loading..." : "Create Lesson"}
            </button>
            <button
              onClick={() => navigate(`/courses/${courseId}/quiz/create`)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Add Quiz
            </button>
            <button
              onClick={() => navigate(`/courses/${courseId}/assignment/create`)}
              className="bg-purple-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Assignment
            </button>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CreateLesson;

