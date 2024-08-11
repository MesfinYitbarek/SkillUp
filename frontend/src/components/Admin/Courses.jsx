import { Delete, Star, CheckBoxOutlineBlank, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useSearch } from "../../SearchContext";

const Courses = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/courses");
        const data = await response.json();
        setCourses(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching courses. Please check your network connection and try again.");
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(
        `/api/courses/deletecoursesByAdmin/${courseId}`
      );

      if (response.data.success) {
        setCourses([...courses.filter((course) => course._id !== courseId)]);
      } else {
        setError("Error deleting course");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting course");
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const slicedCourses = filteredCourses.slice(
    coursesPerPage * (currentPage - 1),
    coursesPerPage * currentPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="text-gray-400" />
          </div>
        </div>
      </div>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : isLoading ? (
        <Box className="flex justify-center items-center h-72">
          <CircularProgress />
        </Box>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className=" text-gray-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Course Name</th>
                  <th scope="col" className="px-6 py-3">Course Category</th>
                  <th scope="col" className="px-6 py-3">Instructor Name</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {slicedCourses.map((data) => (
                  <tr key={data._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-4" src={data.instructorImage} alt={`${data.title} thumbnail`} />
                        <span className="line-clamp-1">{data.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{data.instructor}</td>
                    <td className="px-6 py-4">{data.catagory}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/courseDetails/${data._id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleDeleteCourse(data._id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="mt-6 flex justify-center">
        <Pagination
          count={Math.ceil(filteredCourses.length / coursesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Courses;