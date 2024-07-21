import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import Pagination from "@mui/material/Pagination";

const TopCourses = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);
  const [expandedCourse, setExpandedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/courses");
        const data = await response.json();
        const filteredData = data.filter((course) => course.rating >= 4);
        setCourses(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleToggleDescription = (courseId) => {
    setExpandedCourse((prev) => (prev === courseId ? null : courseId));
  };

  const slicedCourses = courses.slice(
    coursesPerPage * (currentPage - 1),
    coursesPerPage * currentPage
  );

  return (
    <div className="bg-gradient-to-b from-slate-50 to-blue-100 dark:from-gray-800 dark:to-blue-900 px-4 md:px-16 py-20">
      <div className="container mx-auto">
        <h2 className="mb-16 text-center">
          <div className="flex items-center">
            <hr className="flex-grow border-gray-400 h-px" />
            <div className="mx-auto px-4 text-4xl md:text-5xl text-blue-800 dark:text-blue-300 font-bold">
              Top Courses
            </div>
            <hr className="flex-grow border-gray-400 h-px" />
          </div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-10">
          {slicedCourses && slicedCourses.length > 0 && slicedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-blue-950 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-once="true"
            >
              <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">{course.title}</h3>
                  <img src={course.instructorImage} alt="Instructor" className="w-12 h-12 rounded-full border-2 border-blue-500" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 cursor-pointer">
                  {expandedCourse === course._id ? (
                    <span onClick={() => handleToggleDescription(course._id)}>{course.description}</span>
                  ) : (
                    <span className="line-clamp-2" onClick={() => handleToggleDescription(course._id)}>
                      {course.description}
                      {course.description.length > 100 && (
                        <span className="text-blue-600 ml-1 cursor-pointer">...Read more</span>
                      )}
                    </span>
                  )}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 dark:text-gray-400">Duration: {course.duration}</span>
                  {course.isPaid ? (
                    <span className="text-blue-800 dark:text-blue-300 font-bold">₹ {course.price}</span>
                  ) : (
                    <span className="text-green-500 font-bold">Free</span>
                  )}
                </div>
                <hr className="mb-4" />
                <div className="flex justify-between items-center">
                  <a
                    href={`/courseDetails/${course._id}`}
                    className="inline-block px-4 py-2 bg-blue-800 text-white font-bold rounded-lg transition duration-300 hover:bg-blue-800"
                  >
                    Learn More
                  </a>
                  <div className="flex items-center">
                    <StarIcon className="text-yellow-400 mr-1" />
                    <span className="text-gray-700 dark:text-gray-300">{course.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-12">
        <Pagination
          count={Math.ceil(courses.length / coursesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </div>
    </div>
  );
};

export default TopCourses;