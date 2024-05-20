import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
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
  }, [catagory]);

  return (
    <div className=" flex flex-col justify-between   p-10  items-center">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-5 bg-slate-100 border-r-8 border-r-blue-600 border-l-8 border-l-blue-600 py-6 p-10"
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
          </div>
        </div>

        {error && <p className=" text-red-500 mt-5">{error}</p>}
      </form>
    </div>
  );
};

export default CreateCourse;
