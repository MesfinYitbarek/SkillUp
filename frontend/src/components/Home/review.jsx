import React, { useState } from "react";
import Instructor from "./InstructorsData";

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === Instructor.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Instructor.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-gradient-to-t from-blue-100 to-white dark:from-gray-900 dark:to-blue-900 py-20 px-4 sm:px-16 lg:px-52">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-16">
          <span className="inline-block  px-4 py-2 bg-blue-800 text-white text-3xl font-bold rounded-full shadow-lg">
            From the SkillUp Community
          </span>
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Instructor.map((instructor) => (
                <div
                  key={instructor.id}
                  className="w-full flex-shrink-0 bg-white dark:bg-gray-800 border border-gray-300 py-6 overflow-hidden "
                >
                  <div className="p-6 text-center sm:gap-20 gap-3  flex justify-center items-center">
                    
                    <p className="text-gray-600 w-[50%]  dark:text-gray-300 italic">
                      {instructor.review}
                    </p>
                    <div className=" ">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 text-blue-800 shadow-lg"
                    />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {instructor.name}
                    </h3>
                    <p className="text-blue-800 dark:text-blue-400 font-medium mb-4">
                      {instructor.profession}
                    </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevCard}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextCard}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;