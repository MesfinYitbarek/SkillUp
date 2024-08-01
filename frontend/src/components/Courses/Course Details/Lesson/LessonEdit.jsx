import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import { FaVideo, FaFileAlt, FaSave } from "react-icons/fa";
import { storage } from "../../../../../firebase";
import Header from "../../../Common/Header";
import Footer from "../../../Common/Footer";

const LessonEdit = () => {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const { loading, error } = useSelector((state) => state.user);

  const [lesson, setLesson] = useState({
    title: "",
    description: "",
    videoFile: null,
    uploadProgress: 0,
    videoUrl: "",
    documentText: "",
  });

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`/api/lesson/${lessonId}`);
        setLesson({
          title: response.data.title,
          description: response.data.description,
          videoFile: null,
          uploadProgress: 0,
          videoUrl: response.data.videoUrl,
          documentText: response.data.content,
        });
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleLessonChange = (field, value) => {
    setLesson((prevLesson) => ({
      ...prevLesson,
      [field]: value,
    }));
  };

  const handleVideoFileChange = (event) => {
    setLesson((prevLesson) => ({
      ...prevLesson,
      videoFile: event.target.files[0],
    }));
  };

  const handleUpdateLesson = async () => {
    try {
      if (lesson.videoFile) {
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
            handleLessonChange("uploadProgress", progress);
          },
          (error) => {
            console.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            handleLessonChange("videoUrl", downloadURL);
            await updateLesson(downloadURL);
          }
        );
      } else {
        await updateLesson(lesson.videoUrl);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the lesson. Please try again.");
    }
  };

  const updateLesson = async (videoUrl) => {
    await axios.put(`/api/lesson/${lessonId}`, {
      title: lesson.title,
      description: lesson.description,
      videoUrl,
      content: lesson.documentText,
      course: courseId,
    });

    navigate(`/instructor`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-800 text-white py-6 px-8">
            <h2 className="text-3xl font-bold">Edit Lesson</h2>
          </div>
          <div className="p-8">
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lesson.title}
                onChange={(e) => handleLessonChange("title", e.target.value)}
                placeholder="Enter lesson title"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                id="description"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                value={lesson.description}
                onChange={(e) => handleLessonChange("description", e.target.value)}
                placeholder="Enter lesson description"
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="videoFile" className="block text-gray-700 font-semibold mb-2">
                Video File
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center justify-center px-4 py-2 bg-blue-800 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300">
                  <FaVideo className="mr-2" />
                  Choose Video
                  <input
                    type="file"
                    id="videoFile"
                    className="hidden"
                    onChange={handleVideoFileChange}
                  />
                </label>
                <span className="text-gray-600">
                  {lesson.videoFile ? lesson.videoFile.name : "No file chosen"}
                </span>
              </div>
              {lesson.uploadProgress > 0 && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-800 h-2.5 rounded-full"
                      style={{ width: `${lesson.uploadProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{Math.round(lesson.uploadProgress)}% Uploaded</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="documentText" className="block text-gray-700 font-semibold mb-2">
                Document
              </label>
              <div className="relative">
                <FaFileAlt className="absolute top-3 left-3 text-gray-400" />
                <textarea
                  id="documentText"
                  className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="6"
                  value={lesson.documentText}
                  onChange={(e) => handleLessonChange("documentText", e.target.value)}
                  placeholder="Enter lesson document content"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                onClick={handleUpdateLesson}
                disabled={loading}
              >
                <FaSave className="mr-2" />
                {loading ? "Updating..." : "Update Lesson"}
              </button>
            </div>

            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LessonEdit;