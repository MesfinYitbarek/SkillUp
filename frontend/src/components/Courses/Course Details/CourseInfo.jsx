import React from "react";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import { useState, useEffect } from "react";


const CourseInfo = () => {
  const [course, setCourse] = useState([]);
  const { courseId } = useParams();
  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`/api/courses/courseDetails/${courseId}`);
      const data = await response.json();
      setCourse(data);
    };

    fetchCourse();
  }, [courseId]);

  return (
    <div>
      {course ? (
        <div className=" flex flex-col gap-7">
          <div className="p-6  border border-slate-300 ">
            <h1 className=" text-2xl font-bold py-4">What you'll learn</h1>
            <div className="sm:grid sm:grid-cols-2 ">
              <p>
                <ul className=" list-none pl-4 ">
                  {course.learningObjectives?.map((objective, index) => (
                    <li key={index}>
                      <CheckCircleOutlineIcon className="text-blue-600 mr-2" />{" "}
                      {objective}
                    </li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
          <div className=" flex flex-col">
            <h1 className=" py-5 flex gap-2  font-bold text-2xl">
              Requirements
            </h1>
            <p>
              <ul className=" list-none pl-4 ">
                {course.requirements?.map((objective, index) => (
                  <li key={index}>
                    <CheckIcon className="text-blue-600 mr-2" /> {objective}
                  </li>
                ))}
              </ul>
            </p>
          </div>
        </div>
      ) : (
        <div>data.not found</div>
      )}
    </div>
  );
};

export default CourseInfo;
