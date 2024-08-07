import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSearch } from "../../SearchContext";

const InstructorCourse = () => {
  const { searchTerm } = useSearch();
  const [courses, setCourses] = useState([]);
  const { loading, currentUser } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [coursesPerPage] = useState(6);
  const [error, setError] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);

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
        const response = await fetch(
          `/api/courses/personalcourses/${currentUser._id}`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          setCourses([]);
          setError("Unexpected response format.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching courses. Please try again later.");
      }
    };

    if (currentUser && currentUser._id) {
      fetchCourses();
    }
  }, [currentUser, courses]);

  const handleCourseDelete = async (courseid) => {
    try {
      const res = await fetch(`/api/courses/deletecourses/${courseid}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setCourses((prev) => prev.filter((course) => course._id !== courseid));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleToggleDescription = (courseId) => {
    setExpandedCourse((prev) => (prev === courseId ? null : courseId));
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const slicedCourses = filteredCourses.slice(
    coursesPerPage * (currentPage - 1),
    coursesPerPage * currentPage
  );

  return (
    <div className="px-16 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slicedCourses &&
                slicedCourses.length > 0 &&
                slicedCourses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-2xl border border-slate-300 overflow-hidden flex flex-col h-full"
                  >
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold mb-2 truncate">
                        {course.title}
                      </h3>
                      <p className="dark:text-white text-blue-950 mb-2 flex-grow">
                        {expandedCourse === course._id ? (
                          <span
                            onClick={() => handleToggleDescription(course._id)}
                            className="cursor-pointer"
                          >
                            {course.description}
                          </span>
                        ) : (
                          <span
                            className="line-clamp-2 cursor-pointer"
                            onClick={() => handleToggleDescription(course._id)}
                          >
                            {course.description}
                            {course.description.length > 100 && (
                              <span className="text-blue-500 ml-1">
                                ...Read more
                              </span>
                            )}
                          </span>
                        )}
                      </p>
                      <div className="flex justify-between items-center  mt-2 mb-3">
                        <span className="dark:text-white text-gray-700 text-sm">
                          Duration: {course.duration}
                        </span>
                        <span className="flex items-center">
                          <StarIcon className="text-yellow-400" />
                          <span className="text-gray-700 ml-1">
                          {Number(course.rating).toFixed(2)} ({course.reviewCount} reviews)
                          </span>
                        </span>
                       
                      </div>
                      <hr className="my-3" />
                      <div className="flex flex-wrap gap-2 justify-between items-center">
                        <Link
                          to={`/courseDetails/${course._id}`}
                          className="inline-block px-3 py-1 border-blue-800 border text-blue-800 font-bold rounded"
                        >
                          Details
                        </Link>
                        <button
                          disabled={loading}
                          onClick={() => handleCourseDelete(course._id)}
                          className="px-3 py-1 border-red-500 border text-red-600 font-bold rounded"
                        >
                          {loading ? "Loading..." : "Delete"}
                        </button>
                        <Link
                          to={`/course-edit/${course._id}`}
                          className="px-3 py-1 border-blue-800 border text-blue-800 font-bold rounded"
                        >
                          Edit
                        </Link>
                      </div>
                      <div className="mt-4 flex gap-4 items-center">
                        <Link
                          to={`/course-lessons/${course._id}`}
                          state={course.title}
                          className="flex-1 text-center px-3 py-1 border-blue-800 border text-blue-800 font-bold rounded"
                        >
                          Lesson
                        </Link>
                        <Link
                          to={`/students/${course._id}`}
                          state={course.title}
                          className="flex-1 text-center px-3 py-1 border-blue-800 border text-blue-800 font-bold rounded"
                        >
                          Students
                        </Link>
                        {course.isPaid ? (
                          <span className="text-blue-600 font-bold">
                            &#36;{course.price}
                          </span>
                        ) : (
                          <span className="text-green-500 font-bold">Free</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
              <Pagination
                count={Math.ceil(courses.length / coursesPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InstructorCourse;