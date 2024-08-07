import { Delete, Star } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useSearch } from "../../SearchContext";

const Courses = () => {
  const { searchTerm } = useSearch();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);

  useEffect(() => {
    setTimeout(() => {
      try {
        setIsLoading(false);
      } catch (error) {
        setError(
          "Error fetching courses. Please check your network connection and try again."
        );
      }
    }, 1000);
  }, [courses]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/courses");
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, [courses]);

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
    <div className="flex flex-col items-center justify-center text-blue-900 p-3 pt-24 ml-10">
      <div>
        {error ? (
          <p className="text-red-500 text-center">
            Error fetching courses. Please check your network connection and try again.
          </p>
        ) : isLoading ? (
          <Box
            className="flex justify-center items-center h-72"
          >
            <CircularProgress />
          </Box>
        ) : (
          <div className="flex justify-center items-center bg-white p-6">
            <div className="overflow-x-auto w-full">
              <table className="bg-white w-full">
                <thead>
                  <tr className="bg-blue-800 text-white font-bold">
                    <th className="p-2"></th>
                    <th className="text-center p-2">Course Name</th>
                    <th className="p-2">Instructor Name</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {slicedCourses &&
                    slicedCourses.length > 0 &&
                    slicedCourses.map((data) => (
                      <tr key={data._id} className="hover:bg-gray-200">
                        <td className="p-2">
                          <CheckBoxOutlineBlankIcon />
                        </td>
                        <td className="p-3 flex items-center gap-2">
                          <img
                            src={data.instructorImage}
                            alt="Instructor"
                            className="h-8 w-8 object-cover rounded-md"
                          />
                          {data.title}
                        </td>
                        <td className="px-20">{data.instructor}</td>
                        <td className="p-2">
                          <Link
                            to={`/courseDetails/${data._id}`}
                            className="inline-block px-3 py-1.5 border border-blue-800 text-blue-800 font-bold rounded"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Pagination
        count={Math.ceil(courses.length / coursesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </div>
  );
};

export default Courses;