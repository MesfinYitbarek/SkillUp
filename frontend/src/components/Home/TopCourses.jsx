import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const TopCourses = () => {
  const [courses, setCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

    const handleResize = () => {
      setCurrentIndex(0); // Reset index on resize to prevent out-of-bound issues
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleDescription = (courseId) => {
    setExpandedCourse((prev) => (prev === courseId ? null : courseId));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, courses.length - getVisibleCount()));
  };

  const getVisibleCount = () => {
    if (window.innerWidth >= 1024) return 3; // lg
    if (window.innerWidth >= 640) return 2; // sm
    return 1; // xs
  };

  const visibleCourses = courses.slice(currentIndex, currentIndex + getVisibleCount());

  return (
    <div className="bg-gradient-to-b from-slate-50 to-blue-100 px-3 dark:from-gray-800 dark:to-blue-900 py-20">
      <div className="container mx-auto">
        <h2 className="mb-16 text-center">
          <div className="flex items-center">
            <hr className="flex-grow border-gray-400 h-px" />
            <div className="mx-auto px-4 text-4xl md:text-5xl text-blue-800 dark:text-blue-300 font-lato font-bold">
              Top Courses
            </div>
            <hr className="flex-grow border-gray-400 h-px" />
          </div>
        </h2>
        <div className="relative">
          {courses.length > getVisibleCount() && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-blue-950 rounded-full p-2 shadow-lg"
                disabled={currentIndex === 0}
              >
                <ArrowBackIosNewIcon className={`${currentIndex === 0 ? 'text-gray-400' : 'text-blue-800 dark:text-blue-300'}`} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-blue-950 rounded-full p-2 shadow-lg"
                disabled={currentIndex + getVisibleCount() >= courses.length}
              >
                <ArrowForwardIosIcon className={`${currentIndex + getVisibleCount() >= courses.length ? 'text-gray-400' : 'text-blue-800 dark:text-blue-300'}`} />
              </button>
            </>
          )}
          <div className="flex overflow-hidden sm:px-20  sm:pr-36 sm:gap-10">
            {visibleCourses.map((course) => (
              <div
                key={course.id}
                className="flex-none w-full sm:w-1/2 lg:w-1/3 p-4 "
              >
                <div className="bg-white dark:bg-blue-950 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay="300" data-aos-once="true">
                  <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-blue-300">{course.title}</h3>
                      <img src={course.instructorImage} alt="Instructor" className="w-12 h-12 rounded-full border-2 border-slate-300" />
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
                        Detail
                      </a>
                      <div className="flex items-center">
                        <StarIcon className="text-yellow-400 mr-1" />
                        <span className="text-gray-700 dark:text-gray-300">{Number(course.rating).toFixed(1)} ({course.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCourses;