import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
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
      navigate("/courses");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className=" flex flex-col justify-between items-center">
      <form onSubmit={handleSubmit} className=" p-20">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
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
        <button disabled={loading} type="submit">
          {loading ? "Loading..." : "Create Course"}
        </button>
        {error && <p className=" text-red-500 mt-5">{error}</p>}
      </form>
    </div>
  );
};

export default CreateCourse;
