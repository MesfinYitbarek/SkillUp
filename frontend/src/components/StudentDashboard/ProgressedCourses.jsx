import { Delete } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

const ProgressedCourses = () => {
  const [course, setCourse] = useState([]);
  const [coursesPerPage] = useState(6);
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(course);

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


  useEffect(() => {
    const fetchCourseDetails = async () => {
      const response = await fetch(
        `/api/courses/enrolledCourses/${currentUser.username}`
      );
      const data = await response.json();
      setCourse(data); 
    };

    fetchCourseDetails();
  }, [currentUser]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Get the current page courses
  const slicedCourses = course.slice(
    coursesPerPage * (currentPage - 1),
    coursesPerPage * currentPage
  );

  return (
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
      <div className=" grid grid-cols-3 gap-5">
        {slicedCourses.map((data) => (
          <div>
            <div className=" bg-white rounded-lg shadow-sm  p-5 flex flex-col  gap-5 ">
              <div>
                <img
                  src={data.imageUrl}
                  className=" object-cover w-[320px] h-[130px]"
                  alt=""
                />
              </div>
              
              <div className="  p-2   flex flex-col gap-2">
                <h1 className="font-bold">{data.title}</h1>
                <div className="flex justify-between items-center ">
                  <h2 className=" bg-slate-100 p-1 px-3">{data.duration}</h2>

                  {course.isPaid ? (
                    <span className="text-blue-600 text-xl mb-3 font-bold">
                      &#8377; {course.price}
                    </span>
                  ) : (
                    <span className="text-green-500 text-xl mb-3 font-bold">
                      Free
                    </span>
                  )}
                </div>

                <p className=" opacity-75 ">{data.description}</p>
                <div className=" flex justify-between items-center">
                  <button className=" p-0.5 px-5  text-red-500 bg-red-100 ">
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
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
              <Pagination
                count={Math.ceil(slicedCourses.length / coursesPerPage)} // Total pages based on courses and per page limit
                page={currentPage}
                onChange={handlePageChange}
                color="primary" // Optional: Set color theme
              />
            </div>
          </>
        )}
    </div>
  );
};

export default ProgressedCourses;
