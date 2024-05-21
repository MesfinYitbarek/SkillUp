import { Delete } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ProgressedCourses = () => {
  const [course, setCourse] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  console.log(course);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      const response = await fetch(
        `/api/courses/enrolledCourses/${currentUser.username}`
      );
      const data = await response.json();
      setCourse(data); // Assuming data contains enrolled courses
    };

    fetchCourseDetails();
  }, [currentUser]);
  return (
    <div>
      <div className=" grid grid-cols-3 gap-2">
        {course.map((data) => (
          <div>
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
    </div>
  );
};

export default ProgressedCourses;
