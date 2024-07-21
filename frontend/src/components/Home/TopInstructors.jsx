import React from "react";
import Instructor from "./InstructorsData";
import ShareIcon from "@mui/icons-material/Share";

const TopInstructors = () => {
  return (
    <div className="bg-gradient-to-b from-slate-100 to-purple-100 dark:from-gray-900 dark:to-blue-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-800 text-white text-4xl font-bold rounded-lg shadow-lg transform -skew-x-6">
            Top Instructors
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Instructor.map((instructor) => (
            <div
              key={instructor.id}
              data-aos="flip-left"
              data-aos-delay="100"
              data-aos-duration="1000"
              data-aos-once="true"
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-blue-800 px-4 py-2 rounded-full font-bold hover:bg-blue-800 hover:text-white transition-colors duration-300">
                    View Profile
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {instructor.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {instructor.profession}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-800 font-semibold">
                    {instructor.courses} courses
                  </span>
                  <button className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-300">
                    <ShareIcon className="text-blue-800 dark:text-blue-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopInstructors;