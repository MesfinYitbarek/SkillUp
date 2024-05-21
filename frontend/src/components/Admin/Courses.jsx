import { Delete, Star } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);

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
    <div className=" flex flex-col items-center justify-center text-blue-900 p-3  ml-10">
      <div>
        <div className=" ml-60 mr-10 p-6 font-bold text-2xl">
          <h1>All Courses</h1>
        </div>
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
                  <h2 className=" bg-slate-100 p-1 px-3">{data.duration}</h2>

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
                  <button className=" p-0.5 px-5  text-purple-500 bg-purple-100 ">
                    Details
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 font-bold">{error}</p>}{" "}
              
            </div>
          ))}
        </div>
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
