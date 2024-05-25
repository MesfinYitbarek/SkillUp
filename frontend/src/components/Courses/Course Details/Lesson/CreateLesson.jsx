import React, { useState } from "react";
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
import { useSelector } from "react-redux";
const CreateLesson = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [documentText, setDocumentText] = useState("");
  const { courseId } = useParams();
  const { loading, error } = useSelector((state) => state.user);

  const [lessons, setLessons] = useState([
    { title: "", description: "", videoFile: null, documentText: "" },
  ]);

  const addLesson = () => {
    setLessons([
      ...lessons,
      { title: "", description: "", videoFile: null, documentText: "" },
    ]);
  };

  const removeLesson = (index) => {
    const updatedLessons = [...lessons];
    updatedLessons.splice(index, 1);
    setLessons(updatedLessons);
  };

  console.log(title, description, videoUrl, documentText);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDocumentTextChange = (event) => {
    setDocumentText(event.target.value);
  };
  const handleVideoFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleCreateLesson = async () => {
    try {
      if (!videoFile) {
        alert("Please select a video file.");
        return;
      }

      // File size validation (1 GB limit)
      if (videoFile.size > 1024 * 1024 * 1024) {
        alert("Video file size exceeds the limit (1 GB).");
        return;
      }

      const storageRef = ref(storage, `videos/${videoFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, videoFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setVideoUrl(downloadURL);

            // Now send the video URL to your backend API to save the lesson data
            axios.post("/api/lesson/create", {
              title,
              description,
              videoUrl: downloadURL,
              content: documentText,
              course: courseId,
            });

            navigate(`/courses`);
          });
        }
      );
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading the video. Please try again.");
    }
  };

  return (
    <div className=" flex justify-center items-center">
      <div className="container mx-auto p-14 w-[50%] my-12   bg-slate-100">
        <h2 className="text-2xl font-bold mb-4">Create New Lesson</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={handleTitleChange}
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="videoFile"
            className="block text-gray-700 font-bold mb-2"
          >
            Video:
          </label>
          <input
            type="file"
            id="videoFile"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleVideoFileChange}
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={documentText}
            onChange={handleDocumentTextChange}
          />
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
            onClick={() => navigate(`/courses/${courseId}/quiz/create`)} // Navigate to quiz creation
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Add Quiz
          </button>
          <button
            onClick={() => navigate(`/courses/${courseId}/assignment/create`)} // Navigate to assignment creation
            className="bg-purple-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Assignment
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateLesson;
