import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import Pagination from "@mui/material/Pagination";

const Topcourses = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);
  const [expandedCourse, setExpandedCourse] = useState(null);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/courses");
        const data = await response.json();
        const filteredData = data.filter((course) => course.rating >= 4); // Filter courses with rating > 4
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
    <div className="bg-slate-50 px-16 py-20 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h2 className="sm:mb-24 mb-8 text-center">
          <div className="flex items-center">
            <hr className="flex-grow border-gray-400 h-px" />
            <div className="mx-auto px-4 text-4xl text-blue-800 font-semibold">
              Top Courses
            </div>
            <hr className="flex-grow border-gray-400 h-px" />
          </div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {slicedCourses &&
            slicedCourses.length > 0 &&
            slicedCourses.map((course) => (
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-once="true"
                key={course.id}
                className="dark:bg-blue-950 dark:text-white bg-white shadow-lg rounded-md overflow-hidden"
              >
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold py-[3px] rounded">
                      {course.title}
                    </h3>
                    <img
                      src={course.instructorImage}
                      alt="Instructor"
                      className="relative -top-9 right-1 w-12 h-12 rounded-full p-1 bg-slate-100"
                    />
                  </div>
                  <p className="dark:text-white cursor-pointer text-base font-semibold text-blue-950 mb-2">
                    {expandedCourse === course._id ? (
                      <span onClick={() => handleToggleDescription(course._id)}>
                        {course.description}
                      </span>
                    ) : (
                      <span
                        className="line-clamp-2 "
                        onClick={() => handleToggleDescription(course._id)}
                      >
                        {course.description}
                        {course.description.length > 100 && (
                          <span className="text-blue-800 cursor-pointer">
                            ...Read more
                          </span>
                        )}
                      </span>
                    )}
                  </p>

                  <div className="flex justify-between items-center mt-2 mb-3">
                    <span className="dark:text-white text-gray-700 text-sm">
                      Duration: {course.duration}
                    </span>

                    {course.isPaid ? (
                      <span className="text-blue-800 font-bold">
                        &#8377; {course.price}
                      </span>
                    ) : (
                      <span className="text-green-500 font-bold">Free</span>
                    )}
                  </div>

                  <hr />

                  <div className="flex justify-between items-center">
                    <a
                      href={`/courseDetails/${course._id}`}
                      className="inline-block px-3 py-1.5 border-blue-800 border text-blue-800 font-bold rounded mt-4"
                    >
                      Learn More
                      </a>
                    <span>
                      <StarIcon className="text-yellow-400" />
                      <span className="text-gray-700 ml-1">
                        {course.rating}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center items-center text-center">
        <Pagination
          count={Math.ceil(courses.length / coursesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Topcourses;