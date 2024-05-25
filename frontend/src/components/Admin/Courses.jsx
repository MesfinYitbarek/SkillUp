import { Delete, Star } from "@mui/icons-material";
import React, {useEffect} from "react";
import { useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
const Courses = () => {
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

  React.useEffect(() => {
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

  const slicedCourses = courses.slice(
    coursesPerPage * (currentPage - 1),
    coursesPerPage * currentPage
  );

  return (
    <div className=" flex flex-col items-center justify-center text-blue-900 p-3 pt-24  ml-10">
      <div>
        {error ? (
          <p className="text-red-500 text-center">
            Error fetching courses. Please check your network connection and try
            again.
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
            <div className=" ml-60 mr-10 gap-5 grid grid-cols-3">
              {slicedCourses &&
                slicedCourses.length > 0 &&
                slicedCourses.map((data) => (
                  <div className=" bg-white rounded-sm shadow-sm p-5 flex gap-5 items-center">
                    <div>
                      <img
                        src={data.imageUrl}
                        className=" object-cover w-[120px] h-[130px]"
                        alt=""
                      />
                    </div>
                    <div className="  flex flex-col gap-2">
                      <h1 className="font-bold">{data.title}</h1>
                      <div className="flex gap-4 items-center ">
                        <h2 className=" bg-slate-100 p-1 px-3">
                          {data.duration}
                        </h2>

                        <h2 className=" bg-slate-100 p-1 px-3">
                          &#8377; {data.price}
                        </h2>
                      </div>

                      <p className=" opacity-75 ">{data.description}</p>
                      <div className=" flex items-center gap-4">
                        <button
                          onClick={() => handleDeleteCourse(data._id)}
                          className=" p-0.5 px-5  text-red-500 bg-red-100 "
                        >
                          {" "}
                          <Delete />
                        </button>
                        <Link
                          to={`/courseDetails/${data._id}`}
                          className="inline-block px-3 py-1.5 border-purple-500 border bg-red-50 text-purple-600 font-bold rounded "
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                    {error && <p className="text-red-500 font-bold">{error}</p>}{" "}
                  </div>
                ))}
            </div>
          </>
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
