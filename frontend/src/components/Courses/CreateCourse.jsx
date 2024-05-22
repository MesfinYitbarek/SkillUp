import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateCourse = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

    try {
      setLoading(true);
      const res = await fetch("/api/courses/createCourses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/instructor-courses");
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
  }, [catagory]);

  return (
    <div className="flex flex-col justify-between items-center py-8 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded shadow-md p-6">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
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
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Course Catagory
          </label>
          <select
            id="catagory"
            value={formData.catagory}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-blue-500 focus:shadow-outline"
          >
            {catagory.map((catagory) => (
              <option value={catagory.name}>{catagory.labelName}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 text-sm font-bold mb-2"
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
            className="block text-gray-700 text-sm font-bold mb-2"
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
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
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
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-gray-700 text-sm font-bold mb-2"
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
            className="block text-gray-700 text-sm font-bold mb-2"
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
                className="block text-gray-700 text-sm font-bold mb-2"
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
            className="block text-gray-700 text-sm font-bold mb-2"
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
        <button
          disabled={loading}
          type="submit"
          className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
                    {loading ? (
            <svg
              className="animate-spin mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1.5 1.5 0 00-3 0v8a1.5 1.5 0 003 1.5s1.5-.5 1.5-1.5v-8zM5 5a1.5 1.5 0 000 3v8a1.5 1.5 0 003 1.5s1.5-.5 1.5-1.5v-8a1.5 1.5 0 00-3-1.5z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M9.5 8a1.5 1.5 0 000 3v4.5a1.5 1.5 0 003 1.5h.5a1.5 1.5 0 100-3v-4.5a1.5 1.5 0 00-3-1.5z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M13.585 3.585a2 2 0 112.828 2.828l-.707.707a1 1 0 001.414 1.414l4.95-4.95a1 1 0 00-1.414-1.414l-.707-.707z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M11.828 16.415a2 2 0 002.828-2.828l-.707-.707a1 1 0 00-1.414 1.414l-4.95-4.95a1 1 0 001.414 1.414l.707.707z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <span className="ml-2">
            {loading ? "Submitting..." : "Create Course"}
          </span>
        </button>
      </form>
      {error && (
        <div className="text-red-500 font-bold text-center">{error}</div>
      )}
    </div>
  );
};

export default CreateCourse;

