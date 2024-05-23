import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar"; 

const CreateCourse = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  console.log(formData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Include learningObjectives, prerequisites, and modules in formData
    formData.learningObjectives = learningObjectives;
    formData.requirements = prerequisites;
    formData.curriculum = modules;

    formData.userRef = currentUser._id;
    formData.instructor = currentUser.username;

    try {
      setLoading(true);
      const res = await fetch("/api/courses/createCourses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/instructor");
    } catch (error) {
      setLoading(false);
      setError(error.message);
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

   // Calculate progress based on filled fields
   const progress = calculateProgress(formData, learningObjectives, prerequisites, modules);

  return (
    <div className=" flex flex-col justify-between bg-slate-100 px-40  p-10  items-center">
      <ProgressBar progress={progress} />
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-5 bg-white rounded-lg border-t-8 border-t-blue-600 border-l-8 border-l-blue-600 py-6 p-10"
      >
        <Link className=" text-center" to={"/instructor"}>
          <ArrowBack />
        </Link>
        <div className="flex justify-between gap-40 ">
          <div>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Course Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-500 focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label
                htmlFor="catagory"
                className="block text-gray-700 font-bold mb-2"
              >
                Course catagory
              </label>
              <select
                id="catagory"
                value={formData.catagory}
                onChange={handleChange}
                className=" shadow"
              >
                {catagory.map((catagory) => (
                  <option value={catagory.name}>{catagory.labelName}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="imageUrl"
                className="block text-gray-700 font-bold mb-2"
              >
                Course Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-500 focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="instructorImage"
                className="block text-gray-700 font-bold mb-2"
              >
                Instructor Image URL
              </label>
              <input
                type="url"
                id="instructorImage"
                value={formData.instructorImage}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-500 focus:shadow-outline"
                required
              />
            </div>
            <label htmlFor="level" className=" text-lg font-bold">
              Course Level:{" "}
            </label>
            <select
              id="level"
              onChange={handleChange}
              className=" dark:bg-slate-100 shadow sm:w-[390px] rounded-lg border border-slate-300 p-2.5 "
            >
              <option value={"All Level"}>All Level</option>
              <option value={"Beginner"}>Beginner</option>
              <option value={"Intermidate"}>Intermidate</option>
              <option value={"Advanced"}>Advanced</option>
            </select>
            <button
              className=" mt-14 bg-blue-600 p-4 py-2 text-white rounded-md"
              disabled={loading}
              type="submit"
            >
              {loading ? "Loading..." : "Create Course"}
            </button>
          </div>
          <div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Course Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-500 focus:shadow-outline"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="duration"
                className="block text-gray-700 font-bold mb-2"
              >
                Course Duration (e.g., 10 weeks)
              </label>
              <input
                type="text"
                id="duration"
                value={formData.duration}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-500 focus:shadow-outline"
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
                  checked={formData.isPaid}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="isPaid">Paid Course</label>
              </div>
              {formData.isPaid && (
                <div>
                  <label
                    htmlFor="price"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Course Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-500 focus:shadow-outline"
                    min="0"
                    defaultValue={0}
                    required
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block text-gray-700 font-bold mb-2"
              >
                Course Rating (optional)
              </label>
              <input
                type="number"
                id="rating"
                value={formData.rating}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-500 focus:shadow-outline"
                min="0"
                max="5"
                step="0.1"
              />
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

              {/* Prerequisites (similar structure as Learning Objectives) */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Prerequisites:
                </label>
                {prerequisites.map((prerequisite, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={prerequisite}
                      onChange={(e) => handlePrerequisiteChange(index, e)} // Replace with appropriate handler function
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

        {error && <p className=" text-red-500 mt-5">{error}</p>}
      </form>
    </div>
  );
};

const calculateProgress = (formData, learningObjectives, prerequisites, modules) => {
 
  const totalFields = 15; 


  let filledFields = Object.keys(formData).length;
  filledFields += learningObjectives.length;
  filledFields += prerequisites.length;
  filledFields += modules.length * 2; 


  const progress = Math.round((filledFields / totalFields) * 100);

  return progress;
};

export default CreateCourse;
