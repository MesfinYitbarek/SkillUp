import React from "react";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import Pagination from "@mui/material/Pagination";

const CourseListing = ({ courses,filteredCourses, searchTerm, catagorizedCourses,selectedCategories  }) => {
  
  useEffect(() => {
  }, [searchTerm, selectedCategories, catagorizedCourses]);

  const displayCourses = searchTerm ? filteredCourses:selectedCategories.length ? catagorizedCourses : courses 

  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);

  
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  
  // Get the current page courses

  const slicedCourses = displayCourses.slice(
    coursesPerPage * (currentPage - 1),
    coursesPerPage * currentPage
  );

  return (
    <div className=" pr-4 dark:bg-gray-800">
      <div className="container mx-auto px-4 pb-8">
        <h2 className=" dark:text-white text-3xl text-sky-800 font-semibold sm:mb-24 mb-8 text-center ">
          Explore Our Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slicedCourses &&
            slicedCourses.length > 0 &&
            slicedCourses.map((course) => (
            <div
              key={course.id}
              className="  rounded-2xl border border-slate-300 overflow-hidden  hover:bg-purple-300 shadow-purple-400  p-4 "
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="px-3 py-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold   py-[3px] rounded">
                    {course.title}
                  </h3>
                  <img
                    src={course.instructorImage}
                    alt="Instructor"
                    className=" relative -top-9 right-1 w-12 h-12 rounded-full p-1 bg-white"
                  />
                </div>
                <p className=" dark:text-white  text-base font-semibold text-blue-950 mb-2">
                  {course.description}
                </p>

                <div className="flex justify-between items-center mt-2 mb-3">
                  <span className="dark:text-white text-gray-700 text-sm">
                    Duration: {course.duration}
                  </span>

                  {course.isPaid ? (
                    <span className="text-blue-600 font-bold">
                      &#8377; {course.price}
                    </span>
                  ) : (
                    <span className="text-green-500 font-bold">Free</span>
                  )}
                </div>

                <hr />

                <div className=" flex justify-between items-center">
                  <a
                    href={`/courses/${course.id}`}
                    className="inline-block px-3 py-1.5  border-purple-500 border bg-red-50 text-purple-600 font-bold rounded mt-4"
                  >
                    Details
                  </a>
                  <span>
                    <StarIcon className=" text-yellow-400" />
                    <span className="text-gray-700 ml-1">{course.rating}</span>
                  </span>
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
            color="primary" // Optional: Set color theme
          />
        </div>
      </div>
    </div>
  );
};

export default CourseListing;
