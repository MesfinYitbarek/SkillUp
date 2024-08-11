import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowRight, Delete, Edit } from "@mui/icons-material";

const Catagory = () => {
  const [catagory, setCatagory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatagory = async () => {
      try {
        const response = await fetch("/api/courses/catagory");
        const data = await response.json();
        setCatagory(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching categories");
      }
    };

    fetchCatagory();
  }, []);

  const handleDeleteCatagory = async (catagoryId) => {
    try {
      const response = await axios.delete(
        `/api/courses/deletecatagory/${catagoryId}`
      );

      if (response.data.success) {
        setCatagory(catagory.filter((cat) => cat._id !== catagoryId));
      } else {
        setError("Error deleting category");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting category");
    }
  };

  return (
    <div className="flex justify-center items-center pt-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl mt-12 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-blue-800 font-bold text-2xl">Categories</h2>
          <Link
            to="/create-catagory"
            className="bg-blue-800 text-white hover:bg-blue-900 px-4 py-2 rounded-md font-semibold flex items-center"
          >
            Add <ArrowRight className="ml-1" />
          </Link>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {catagory.map((data) => (
                <tr key={data._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/update-catagory/${data._id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                      <Edit fontSize="small" />
                    </Link>
                    <button onClick={() => handleDeleteCatagory(data._id)} className="text-red-600 hover:text-red-900">
                      <Delete fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Catagory;