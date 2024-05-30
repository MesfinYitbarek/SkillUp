import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { storage } from "../../../../../firebase";
import Header from "../../../Common/Header";
import Footer from "../../../Common/Footer";
import img from "../../../../assets/background image/vectorstock_24205971.png";

const LessonEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div className="bg-slate-50">
      <div className="fixed top-0 left-0 right-0">
        <Header />
      </div>
      <div className="mt-24 flex justify-center items-center">
        <div
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="text-blue-600 container mx-auto p-14 w-[70%] my-12 bg-sky-600 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Edit Lesson</h2>

          <div className="mb-6 p-4 border rounded-lg">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                placeholder="Lesson title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={lesson.title}
                onChange={(e) => handleLessonChange("title", e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description:
              </label>
              <textarea
                id="description"
                placeholder="Lesson description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={lesson.description}
                onChange={(e) =>
                  handleLessonChange("description", e.target.value)
                }
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="videoFile"
                className="block text-gray-700 font-bold mb-2"
              >
                Video File:
              </label>
              <input
                type="file"
                id="videoFile"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleVideoFileChange}
              />
              <progress
                className="w-full mt-2"
                value={lesson.uploadProgress}
                max="100"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="documentText"
                className="block text-gray-700 font-bold mb-2"
              >
                Document:
              </label>
              <textarea
                id="documentText"
                placeholder="Lesson document"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={lesson.documentText}
                onChange={(e) =>
                  handleLessonChange("documentText", e.target.value)
                }
              ></textarea>
            </div>

            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleUpdateLesson}
            >
              Update Lesson
            </button>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
        
      </div>
    </div>
    
  </div>
  
  </div>
);
};

export default LessonEdit;