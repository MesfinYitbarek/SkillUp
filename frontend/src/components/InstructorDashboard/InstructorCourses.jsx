import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const InstructorCourse = () => {
  const [courses, setCourses] = useState([]);
  const { loading, currentUser } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [coursesPerPage] = useState(6); // 6 courses per page
  const [error, setError] = useState(null);

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
  }, [currentUser,courses]);

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

  // Get the current page courses
  const slicedCourses = courses.slice(
    coursesPerPage * (currentPage - 1),
    coursesPerPage * currentPage
  );

  return (
    <div className="px-16 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4">
        {error ? (
          <p className="text-red-500 text-center">
            {error}
          </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slicedCourses &&
                slicedCourses.length > 0 &&
                slicedCourses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-2xl border border-slate-300 overflow-hidden hover:bg-purple-300 shadow-purple-400 p-4"
                  >
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-36 object-cover rounded-md"
                    />
                    <div className="px-3 py-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold py-[3px] rounded">
                          {course.title}
                        </h3>
                      </div>
                      <p className="dark:text-white font-semibold text-blue-950 mb-2">
                        {course.description}
                      </p>
                      <div className="flex justify-between items-center mt-2 mb-3">
                        <span className="dark:text-white text-gray-700 text-sm">
                          Duration: {course.duration}
                        </span>
                        <span>
                          <StarIcon className=" text-yellow-400" />
                          <span className="text-gray-700 ml-1">
                            {course.rating}
                          </span>
                        </span>
                        {course.isPaid ? (
                          <span className="text-blue-600 font-bold">
                            &#36;{course.price}
                          </span>
                        ) : (
                          <span className="text-green-500 font-bold">Free</span>
                        )}
                      </div>
                      <hr />
                      <div className="flex justify-between items-center mt-3"></div>
                      <div className="flex justify-between items-center">
                        <Link
                          to={`/courseDetails/${course._id}`}
                          className="inline-block px-3 py-1.5 border-purple-500 border bg-red-50 text-purple-600 font-bold rounded "
                        >
                          Details
                        </Link>
                        <button
                          disabled={loading}
                          onClick={() => handleCourseDelete(course._id)}
                          className="px-3 py-1.5 border-red-500 border bg-red-50 text-red-600 font-bold rounded mt-1"
                        >
                          {loading ? "Loading..." : "Delete"}
                        </button>
                        <Link to={`/course-edit/${course._id}`}>Edit</Link>
                      </div>
                      <div  className=" flex justify-between items-center">
        
                      
                      <Link
                          to={`/course-lessons/${course._id}`} state={course.title}
                          className="  px-3 py-1 border-purple-500 border bg-red-50 text-purple-600 font-bold rounded "
                        >
                          Lesson
                        </Link>
                        </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
              <Pagination
                count={Math.ceil(courses.length / coursesPerPage)} // Total pages based on courses and per page limit
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
