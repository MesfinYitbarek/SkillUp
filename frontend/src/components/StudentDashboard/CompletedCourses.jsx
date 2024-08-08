// CompletedCourses.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useSearch } from "../../SearchContext";
import { Link } from "react-router-dom";

const CompletedCourses = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [completedCourses, setCompletedCourses] = useState([]);

  const { searchTerm } = useSearch();

  const [coursesPerPage] = useState(6);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        const response = await axios.get(
          `/api/completed-courses/${currentUser._id}`
        );
        setCompletedCourses(response.data);
      } catch (error) {
        console.error("Error fetching completed courses:", error);
      }
    };

    fetchCompletedCourses();
  }, [currentUser._id]);

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
  }, []);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Get the current page courses
  const filteredCourses = completedCourses.filter((data) => {
    const title = data.courseId.title || "";
    const description = data.courseId.description || "";
    
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const slicedCourses = filteredCourses.slice(
    coursesPerPage * (currentPage - 1),
    coursesPerPage * currentPage
  );

  if (!slicedCourses) {
    return (
      <div className=" flex justify-center items-center">
        <h1>No course found!</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ul className=" grid sm:grid-cols-3 gap-5">
        {slicedCourses.length > 0 ? (
          slicedCourses.map((course) => (
            <li key={course._id} className="mb-4">
              <div>
                <div className=" bg-white rounded-lg shadow-sm  p-5 flex flex-col  gap-5 ">
                  <div>
                    <img
                      src={course.courseId.imageUrl}
                      className=" object-cover w-[320px] h-[130px]"
                      alt=""
                    />
                  </div>

                  <div className="  p-2   flex flex-col gap-2">
                    <h1 className="font-bold">{course.courseId.title}</h1>
                    <div className="flex justify-between items-center ">
                      <h2 className=" bg-slate-100 p-1 px-3">
                        {course.courseId.duration}
                      </h2>

                      {course.courseId.isPaid ? (
                        <span className="text-blue-600 text-xl mb-3 font-bold">
                          &#8377; {course.courseId.price}
                        </span>
                      ) : (
                        <span className="text-green-500 text-xl mb-3 font-bold">
                          Free
                        </span>
                      )}
                    </div>

                    <p className=" opacity-75 ">
                      {course.courseId.description}
                    </p>
                    <div className=" flex justify-between items-center">
                      {/* <button className=" p-0.5 px-5  text-red-500 bg-red-100 ">
                    {" "}
                    <Delete />
                </button>*/}
                      <Link
                        to={`/course-lesson/${course.courseId._id}`}
                        className="inline-block px-3 py-1.5 border-purple-500 border bg-red-50 text-purple-600 font-bold rounded "
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))
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
          <div>No completed Courses</div>
        )}
      </ul>
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(slicedCourses.length / coursesPerPage)} // Total pages based on courses and per page limit
          page={currentPage}
          onChange={handlePageChange}
          color="primary" // Optional: Set color theme
        />
      </div>
    </div>
  );
};

export default CompletedCourses;
