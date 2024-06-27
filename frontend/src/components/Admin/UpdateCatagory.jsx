import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCategory = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const navigate = useNavigate();

  const [category, setCategory] = useState({ name: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`/api/courses/catagory/${id}`);
        setCategory(response.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching category details");
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (event) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`/api/courses/updatecatagory/${id}`, category);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Error updating category");
    }
  };

  return (
    <div className="bg-slate-100 flex justify-center min-h-screen items-center">
      <div className=" bg-white border-l-8 border-l-blue-800 rounded-md mt-12 px-10 py-4">
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <h2 className="text-blue-800 font-bold text-xl mb-4">Edit Category</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={category.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="labelName" className="block text-gray-700 font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              name="labelName"
              id="labelName"
              value={category.labelName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="border text-blue-800 hover:bg-blue-500 hover:text-white border-blue-800 px-4 py-1 mr-1 font-semibold"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
