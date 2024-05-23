import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [error, setError] = useState(null);
  const { loading } = useSelector((state) => state.user);

  // Learning Objectives & Prerequisites
  const [learningObjectives, setLearningObjectives] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);

  const handleAddObjective = (event) => {
    event.preventDefault();
    setLearningObjectives([...learningObjectives, ""]);
  };

  const handleObjectiveChange = (index, event) => {
    const newObjectives = [...learningObjectives];
    newObjectives[index] = event.target.value;
    setLearningObjectives(newObjectives);
  };

  const handleRemoveObjective = (index, event) => {
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

  const handleRemovePrerequisite = (index, event) => {
    const newPrerequisites = [...prerequisites];
    newPrerequisites.splice(index, 1);
    setPrerequisites(newPrerequisites);
  };

  // Curriculum
  const [modules, setModules] = useState([]);

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

  const handleRemoveModule = (index, event) => {
    const newModules = [...modules];
    newModules.splice(index, 1);
    setModules(newModules);
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedCourse = {
        ...course,
        learningObjectives: learningObjectives,
        requirements: prerequisites,
        curriculum: modules,
      };

      const response = await axios.post(
        `/api/courses/updatecourses/${courseId}`,
        updatedCourse
      );
      if (response) {
        setError(response.data.message || "updated"); // Handle successful update (e.g., navigate back to course list or display a success message)
      } else {
        setError(response.data.message || "Update failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error updating course. Please try again.");
    }
  };

  const [catagory, setCatagory] = React.useState([]);
  React.useEffect(() => {
    const fetchCatagory = async () => {
      try {
        const response = await fetch("/api/courses/catagory");
        const data = await response.json();
        setCatagory(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCatagory();
  }, []);

  return (
    <div className=" bg-slate-100">
      <div className="p-10 px-32">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {course && (
          <form onSubmit={handleSubmit}>
            <div className=" bg-white flex justify-between p-10 border-y-8 border-y-blue-600 rounded-lg ">
              <div>
                <div className="mb-4">
                  <label className="block font-bold text-gray-700 mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                    type="text"
                    name="title"
                    value={course.title || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block font-bold text-gray-700 mb-2"
                    htmlFor="catagory"
                  >
                    Catagory
                  </label>

                  <select
                    id="catagory"
                    value={course.catagory}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                  >
                    {catagory.map((catagory) => (
                      <option value={catagory.name}>
                        {catagory.labelName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block font-bold text-gray-700 mb-2"
                    htmlFor="imageUrl"
                  >
                    Course Image URL
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                    type="url"
                    name="imageUrl"
                    value={course.imageUrl || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block font-bold text-gray-700 mb-2"
                    htmlFor="instructorImage"
                  >
                    Instructor Image URL
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                    type="url"
                    name="instructorImage"
                    value={course.instructorImage || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold text-gray-700 mb-2" htmlFor="level">
                    Course Level
                  </label>

                  <select
                    id="level"
                    onChange={handleChange}
                    className=" dark:bg-slate-100  sm:w-[390px] rounded-lg border border-slate-300 p-2.5 "
                  >
                    <option value={"All Level"}>All Level</option>
                    <option value={"Beginner"}>Beginner</option>
                    <option value={"Intermidate"}>Intermidate</option>
                    <option value={"Advanced"}>Advanced</option>
                  </select>
                </div>
                <div className=" flex items-center justify-center">
                <button
                  type="submit"
                  className="border mt-16 bg-blue-600 rounded-md text-white hover:bg-blue-700 hover:text-white border-blue-600 px-4 py-2 mr-1 font-semibold"
                >
                  Update Category
                </button>
                </div>
                
              </div>
              <div className=" bg-blue-50 rounded-lg px-20 p-10">
                <div className="mb-4">
                  <label
                    className="block font-bold text-gray-700 mb-2"
                    htmlFor="description"
                  >
                    Course Description
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                    type="text"
                    name="description"
                    value={course.description || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block font-bold text-gray-700 mb-2"
                    htmlFor="duration"
                  >
                    Course Duration (e.g., 10 weeks)
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                    type="text"
                    name="duration"
                    value={course.duration || ""}
                    onChange={handleChange}
                    rows="5"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="isPaid"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Course Pricing
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPaid"
                      checked={course.isPaid}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="isPaid">Paid Course</label>
                  </div>

                  {/* Render the price input, but apply a disabled style if isPaid is false */}
                  <div className="mb-4">
                    <label
                      htmlFor="price"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Course Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={course.price}
                      onChange={handleChange}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-500 focus:shadow-outline ${
                        !course.isPaid ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      min="0"
                      defaultValue={0}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {/* Learning Objectives */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Learning Objectives:
                    </label>
                    {learningObjectives.map((objective, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={objective}
                          onChange={(e) => handleObjectiveChange(index, e)}
                          placeholder="Enter learning objective"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-500 focus:shadow-outline"
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
                      Add Learning Objective
                    </button>
                  </div>

                  {/* Prerequisites */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Prerequisites:
                    </label>
                    {prerequisites.map((prerequisite, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={prerequisite}
                          onChange={(e) => handlePrerequisiteChange(index, e)}
                          placeholder="Enter prerequisite"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-500 focus:shadow-outline"
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

                  {/* Curriculum */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Curriculum:
                    </label>
                    {modules.map((module, index) => (
                      <div
                        key={index}
                        className="mb-4 border rounded p-2 shadow-sm"
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
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-500 focus:shadow-outline"
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
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-500 focus:shadow-outline"
                          rows="5"
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
