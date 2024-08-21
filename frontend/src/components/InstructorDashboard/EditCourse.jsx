import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [error, setError] = useState(null);
  const { loading } = useSelector((state) => state.user);
  const [courseImageFile, setCourseImageFile] = useState(null);
  const [instructorImageFile, setInstructorImageFile] = useState(null);

  const [learningObjectives, setLearningObjectives] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [modules, setModules] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/courseEdit/${courseId}`);
        const data = await response.json();
        setCourse(data);
        setLearningObjectives(data.learningObjectives || []);
        setPrerequisites(data.requirements || []);
        setModules(data.curriculum || []);
      } catch (err) {
        console.error(err);
        setError("Error fetching course details");
      }
    };

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch("/api/courses/category");
        const data = await response.json();
        setCategory(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategory();
  }, []);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "learningObjectives") {
      setLearningObjectives(value.split(",").map((obj) => obj.trim()));
    } else if (name === "requirements") {
      setPrerequisites(value.split(",").map((req) => req.trim()));
    } else if (name === "price") {
      setCourse({ ...course, [name]: parseFloat(value) });
    } else if (name === "isPaid") {
      setCourse({ ...course, isPaid: checked });
    } else {
      setCourse({ ...course, [name]: value });
    }
  };

  const handleAddObjective = (event) => {
    event.preventDefault();
    setLearningObjectives([...learningObjectives, ""]);
  };

  const handleObjectiveChange = (index, event) => {
    const newObjectives = [...learningObjectives];
    newObjectives[index] = event.target.value;
    setLearningObjectives(newObjectives);
  };

  const handleRemoveObjective = (index) => {
    const newObjectives = [...learningObjectives];
    newObjectives.splice(index, 1);
    setLearningObjectives(newObjectives);
  };

  const handleAddPrerequisite = (event) => {
    event.preventDefault();
    setPrerequisites([...prerequisites, ""]);
  };

  const handlePrerequisiteChange = (index, event) => {
    const newPrerequisites = [...prerequisites];
    newPrerequisites[index] = event.target.value;
    setPrerequisites(newPrerequisites);
  };

  const handleRemovePrerequisite = (index) => {
    const newPrerequisites = [...prerequisites];
    newPrerequisites.splice(index, 1);
    setPrerequisites(newPrerequisites);
  };

  const handleAddModule = (event) => {
    event.preventDefault();
    setModules([...modules, { title: "", content: "" }]);
  };

  const handleModuleChange = (index, event) => {
    const newModules = [...modules];
    if (event.target.id === `moduleTitle-${index}`) {
      newModules[index].title = event.target.value;
    } else if (event.target.id === `moduleContent-${index}`) {
      newModules[index].content = event.target.value;
    }
    setModules(newModules);
  };

  const handleRemoveModule = (index) => {
    const newModules = [...modules];
    newModules.splice(index, 1);
    setModules(newModules);
  };

  const handleFileChange = (e, setImageFile) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const storage = getStorage();

      if (courseImageFile) {
        const courseImageRef = ref(storage, `courseImages/${courseImageFile.name}`);
        await uploadBytes(courseImageRef, courseImageFile);
        const courseImageUrl = await getDownloadURL(courseImageRef);
        course.imageUrl = courseImageUrl;
      }

      if (instructorImageFile) {
        const instructorImageRef = ref(storage, `instructorImages/${instructorImageFile.name}`);
        await uploadBytes(instructorImageRef, instructorImageFile);
        const instructorImageUrl = await getDownloadURL(instructorImageRef);
        course.instructorImage = instructorImageUrl;
      }

      const updatedCourse = {
        ...course,
        learningObjectives: learningObjectives,
        requirements: prerequisites,
        curriculum: modules,
      };

      const response = await axios.post(`/api/courses/updatecourses/${courseId}`, updatedCourse);
      if (response) {
        setError(response.data.message || "updated");
      } else {
        setError(response.data.message || "Update failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error updating course. Please try again.");
    }
  };

  return (
    <div className="bg-slate-100 font-lato">
      <div className="p-4 sm:p-10">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {course && (
          <form onSubmit={handleSubmit}>
            <div className="bg-white flex flex-col lg:flex-row justify-between p-8 border-y-8 border-y-blue-800 rounded-lg shadow-md">
              <div className="flex-1 mb-6 lg:mb-0 lg:mr-6">
                <div className="mb-4">
                  <label className="block font-bold text-gray-700 mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    type="text"
                    name="title"
                    value={course.title || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold text-gray-700 mb-2" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={course.category || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {Array.isArray(category) && category.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.labelName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block font-bold text-gray-700 mb-2" htmlFor="imageUrl">
                    Course Image
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    type="file"
                    name="imageUrl"
                    onChange={(e) => handleFileChange(e, setCourseImageFile)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold text-gray-700 mb-2" htmlFor="instructorImage">
                    Instructor Image
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    type="file"
                    name="instructorImage"
                    onChange={(e) => handleFileChange(e, setInstructorImageFile)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold text-gray-700 mb-2" htmlFor="level">
                    Course Level
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={course.level || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    <option value="All Level">All Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="border mt-6 bg-blue-800 rounded-md text-white hover:bg-blue-700 hover:text-white border-blue-800 px-4 py-2 font-semibold"
                  >
                    Update Course
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-blue-50 rounded-lg p-6">
                <div className="mb-4">
                  <label className="block font-bold text-gray-700 mb-2" htmlFor="description">
                    Course Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    name="description"
                    value={course.description || ""}
                    onChange={handleChange}
                    rows="4"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold text-gray-700 mb-2" htmlFor="duration">
                    Course Duration (e.g., 10 weeks)
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    type="text"
                    name="duration"
                    value={course.duration || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="isPaid" className="block text-gray-700 font-bold mb-2">
                    Course Pricing
                  </label>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="isPaid"
                      checked={course.isPaid}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="isPaid">Paid Course</label>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
                      Course Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={course.price || ""}
                      onChange={handleChange}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 ${
                        !course.isPaid ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      min="0"
                      disabled={!course.isPaid}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Learning Objectives
                    </label>
                    {learningObjectives.map((objective, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={objective}
                          onChange={(e) => handleObjectiveChange(index, e)}
                          placeholder="Enter learning objective"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        <button
                          onClick={() => handleRemoveObjective(index)}
                          type="button"
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddObjective}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Add Objective
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Prerequisites
                    </label>
                    {prerequisites.map((prerequisite, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={prerequisite}
                          onChange={(e) => handlePrerequisiteChange(index, e)}
                          placeholder="Enter prerequisite"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        <button
                          onClick={() => handleRemovePrerequisite(index)}
                          type="button"
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddPrerequisite}
                      type="button"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Add Prerequisite
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Curriculum
                    </label>
                    {modules.map((module, index) => (
                      <div
                        key={index}
                        className="mb-4 border rounded p-2 shadow-sm bg-white"
                      >
                        <label
                          htmlFor={`moduleTitle-${index}`}
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Module Title
                        </label>
                        <input
                          type="text"
                          id={`moduleTitle-${index}`}
                          value={module.title}
                          onChange={(e) => handleModuleChange(index, e)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          required
                        />
                        <label
                          htmlFor={`moduleContent-${index}`}
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Module Content
                        </label>
                        <textarea
                          id={`moduleContent-${index}`}
                          value={module.content}
                          onChange={(e) => handleModuleChange(index, e)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          rows="3"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveModule(index)}
                          className="text-red-500 hover:text-red-700 mt-2"
                        >
                          Remove Module
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddModule}
                      type="button"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Add Module
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
        {!course && !error && <p>Loading course details...</p>}
      </div>
    </div>
  );
};

export default EditCourse;