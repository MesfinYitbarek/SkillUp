import React from "react";
import Instructor from "./InstructorsData";

const Review = () => {
  return (
    <div className="bg-gradient-to-t from-blue-100 to-white dark:from-gray-900 dark:to-blue-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-16">
          <span className="inline-block  font-lato px-6 py-3 bg-blue-800 text-white text-3xl font-bold rounded-full shadow-lg">
            From the SkillUp Community
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Instructor.map((instructor) => (
            <div
              key={instructor.id}
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="1000"
              data-aos-once="true"
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="p-6 text-center">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4  text-blue-800 shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {instructor.name}
                </h3>
                <p className="text-blue-800 dark:text-blue-400 font-medium mb-4">
                  {instructor.profession}
                </p>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  {instructor.review}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
