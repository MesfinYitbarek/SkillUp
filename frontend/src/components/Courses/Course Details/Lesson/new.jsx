
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../firebase";
import { useSelector } from "react-redux";

const CreateLesson = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { loading, error } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lessons, setLessons] = useState([
    { title: "", description: "", videoFile: null, videoUrl: "", documentText: "", uploadProgress: 0 },
  ]);

  const handleLessonChange = (index, field, value) => {
    const newLessons = [...lessons];
    newLessons[index][field] = value;
    setLessons(newLessons);
  };

  const handleAddLesson = () => {
    setLessons([...lessons, { title: "", description: "", videoFile: null, videoUrl: "", documentText: "", uploadProgress: 0 }]);
  };

  const handleRemoveLesson = (index) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const handleVideoFileChange = (index, event) => {
    handleLessonChange(index, 'videoFile', event.target.files[0]);
  };

  const handleCreateCourse = async () => {
    try {
      const uploadPromises = lessons.map(async (lesson, index) => {
        if (!lesson.videoFile) {
          throw new Error(`Lesson ${index + 1}: Please select a video file.`);
        }

        if (lesson.videoFile.size > 1024 * 1024 * 1024) {
          throw new Error(`Lesson ${index + 1}: Video file size exceeds the limit (1 GB).`);
        }

        const storageRef = ref(storage, `videos/${lesson.videoFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, lesson.videoFile);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              handleLessonChange(index, 'uploadProgress', progress);
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                handleLessonChange(index, 'videoUrl', downloadURL);
                resolve(downloadURL);
              });
            }
          );
        });
      });

      await Promise.all(uploadPromises);

      const lessonsData = lessons.map((lesson) => ({
        title: lesson.title,
        description: lesson.description,
        videoUrl: lesson.videoUrl,
        content: lesson.documentText,
      }));

      await axios.post("/api/course/create", {
        title,
        description,
        lessons: lessonsData,
        courseId,
      });

      navigate(`/courses`);
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the course. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
  
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Course Title:
        </label>
        <input
          type="text"
          id="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
  
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
          Course Description:
        </label>
        <textarea
          id="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
  
      {lessons.map((lesson, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <h3 className="text-xl font-bold mb-2">Lesson {index + 1}</h3>
  
          <div className="mb-4">
            <label htmlFor={`lesson-title-${index}`} className="block text-gray-700 font-bold mb-2">
              Lesson Title:
            </label>
            <input
              type="text"
              id={`lesson-title-${index}`}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={lesson.title}
              onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor={`lesson-description-${index}`} className="block text-gray-700 font-bold mb-2">
              Lesson Description:
            </label>
            <textarea
              id={`lesson-description-${index}`}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={lesson.description}
              onChange={(e) => handleLessonChange(index, 'description', e.target.value)}
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor={`lesson-videoFile-${index}`} className="block text-gray-700 font-bold mb-2">
              Lesson Video:
            </label>
            <input
              type="file"
              id={`lesson-videoFile-${index}`}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => handleVideoFileChange(index, e)}
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor={`lesson-documentText-${index}`} className="block text-gray-700 font-bold mb-2">
              Lesson Document:
            </label>
            <textarea
              id={`lesson-documentText-${index}`}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={lesson.documentText}
              onChange={(e) => handleLessonChange(index, 'documentText', e.target.value)}
            />
          </div>
  
          <div className="flex justify-end">
            <button
              onClick={() => handleRemoveLesson(index)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Remove Lesson
            </button>
          </div>
        </div>
      ))}
  
      <div className="mb-4">
        <button
          onClick={handleAddLesson}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Lesson
        </button>
      </div>
  
      <div className="flex justify-end">
        <button
          disabled={loading}
          onClick={handleCreateCourse}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? "Loading..." : "Create Course"}
      </button>
      <button
        onClick={() => navigate(`/courses/${courseId}/quiz/create`)} // Navigate to quiz creation
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
      >
        Add Quiz
      </button>
      <button
        onClick={() => navigate(`/courses/${courseId}/assignment/create`)} // Navigate to assignment creation
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Assignment
      </button>
    </div>
  </div>
);
}

export default CreateLesson;
