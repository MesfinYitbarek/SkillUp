import { Delete, Star } from "@mui/icons-material";
import React from "react";

const Courses = () => {
  const [courses, setCourses] = React.useState([]);

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
  }, []);

  return (
    <div className=" flex justify-center text-blue-900 p-3  ml-10">
      <div>
        <div className=" ml-60 mr-10 p-6 font-bold text-2xl">
          <h1>All Courses</h1>
        </div>
        <div className=" ml-60 mr-10 gap-5 grid grid-cols-3">
          {courses.map((data) => (
            <div className=" bg-white rounded-sm shadow-sm p-5 flex gap-5 items-center">
              <div>
                <img src={data.imageUrl} className=" object-cover w-[120px] h-[130px]" alt="" />
              </div>
              <div className="  flex flex-col gap-2">
                <h1 className="font-bold">{data.title}</h1>
                <div className="flex gap-4 items-center ">
                  <h2 className=" bg-slate-100 p-1 px-3">{data.duration}</h2>

                  <h2 className=" bg-slate-100 p-1 px-3">&#8377; {data.price}</h2>
                </div>

                <p className=" opacity-75 ">{data.description}</p>
                <div className=" flex items-center gap-4">
                  <button className=" p-0.5 px-5  text-red-500 bg-red-100 "> <Delete/></button>
                  <button  className=" p-0.5 px-5  text-purple-500 bg-purple-100 ">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
