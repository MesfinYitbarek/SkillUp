import React from "react";
import courses from "../Courses/coursesData";
import StarIcon from "@mui/icons-material/Star";
const Topcourses = () => {
  return (
    <div className=" bg-slate-50 px-16 py-40 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h2 className="  dark:text-white text-4xl text-sky-800 font-semibold sm:mb-24 mb-8 text-center ">
          Top Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              key={course.id}
              className="  dark:bg-purple-950 bg-white shadow-lg rounded-md  overflow-hidden  hover:bg-purple-300   "
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-48 object-cover "
              />
              <div className="px-3 py-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium odd:bg-purple-300 even:bg-pink-300 px-2 py-[3px] rounded">
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
                    Learn More
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
      </div>
    </div>
  );
};

export default Topcourses;

