import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaMinus, FaUpload } from "react-icons/fa";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../firebase";
import { useSelector } from "react-redux";
import Header from "../../../Common/Header";
import Footer from "../../../Common/Footer";

const CreateLesson = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { loading } = useSelector((state) => state.user);

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
    <div className=" font-lato bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Create New Lesson</h1>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {lessons.map((lesson, index) => (
            <div key={index} className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Lesson {index + 1}</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    id={`title-${index}`}
                    placeholder="Enter lesson title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={lesson.title}
                    onChange={(e) => handleLessonChange(index, "title", e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id={`description-${index}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={lesson.description}
                    placeholder="Enter lesson description"
                    onChange={(e) => handleLessonChange(index, "description", e.target.value)}
                    rows="3"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor={`videoFile-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Video
                  </label>
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor={`videoFile-${index}`}
                      className="cursor-pointer bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      <FaUpload className="inline mr-2" />
                      Choose File
                    </label>
                    <input
                      type="file"
                      id={`videoFile-${index}`}
                      className="hidden"
                      onChange={(e) => handleVideoFileChange(index, e)}
                    />
                    <span className="text-sm text-gray-500">
                      {lesson.videoFile ? lesson.videoFile.name : "No file chosen"}
                    </span>
                  </div>
                  {lesson.videoFile && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${lesson.uploadProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {Math.round(lesson.uploadProgress)}% Uploaded
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor={`documentText-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Note
                  </label>
                  <textarea
                    id={`documentText-${index}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={lesson.documentText}
                    onChange={(e) => handleLessonChange(index, "documentText", e.target.value)}
                    rows="4"
                    placeholder="Enter lesson note "
                  ></textarea>
                </div>
              </div>
              {lessons.length > 1 && (
                <button
                  onClick={() => removeLesson(index)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  <FaMinus className="inline mr-2" /> Remove Lesson
                </button>
              )}
            </div>
          ))}
          <div className="p-6 flex justify-between items-center">
            <button
              onClick={addLesson}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              <FaPlus className="inline mr-2" /> Add Lesson
            </button>
            <button
              disabled={loading}
              onClick={handleCreateLesson}
              className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Lessons"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateLesson;