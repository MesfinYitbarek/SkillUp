import { Delete, Star } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
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
          <div className=" flex justify-center items-center bg-white p-6 ">
          
            <div className="   ">
              <table className="bg-white   ">
                <tr className=" text-white font-bold">
                  <td></td>
                  <td className=" bg-blue-800 text-center  pr-10">Course Name</td>
                  <td className=" bg-blue-800 p-2 px-10">Instructor Name</td>
                  <td className="bg-blue-800"></td>
                </tr>
                {slicedCourses &&
                  slicedCourses.length > 0 &&
                  slicedCourses.map((data) => (
                    <tr className=" hover:bg-gray-200">
                      <td>
                        
                      </td>
                      <td className=" pr-20 p-3  items-center flex gap-2">
                      <CheckBoxOutlineBlankIcon /> <img src={data.instructorImage} alt="image" className="h-[30px] w-[30px] object-cover rounded-md" /> 
                         {data.title}
                      </td>
                      <td className=" px-20 ">{data.instructor}</td>
                      <td>
                        <Link
                          to={`/courseDetails/${data._id}`}
                          className="inline-block px-3 py-1.5 border-blue-800 border  text-blue-800 font-bold rounded "
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
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
