import React from "react";
import courses from "./coursesData";
import StarIcon from "@mui/icons-material/Star";
const CourseListing = () => {
  return (
    <div className=" mx-16 ">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Explore Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className=" rounded-2xl border border-slate-300 overflow-hidden  hover:bg-purple-300 shadow-purple-400 p-4 "
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-48 object-cover rounded-md"
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
                <p className=" text-base font-semibold text-blue-950 mb-2">
                  {course.description}
                </p>

                <div className="flex justify-between items-center mt-2 mb-3">
                  <span className="text-gray-700 text-sm">
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

export default CourseListing;
