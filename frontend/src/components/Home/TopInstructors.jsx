import React from "react";
import Instructor from "./InstructorsData";
import ShareIcon from "@mui/icons-material/Share";
const TopInstructors = () => {
  return (
    <div className=" my-10 dark:bg-gray-800 px-12 sm:py-20 sm:px-20 bg-slate-100">
      <div className="container  mx-auto px-4 py-8">
        <h2 className="  sm:mb-24 mb-8 text-center ">
          <div class="flex items-center">
            <hr class="flex-grow border-gray-400 h-px" />
            <div class="mx-auto px-4 text-4xl text-blue-800 font-semibold">
              Top Instructors
            </div>
            <hr class="flex-grow border-gray-400 h-px" />
          </div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Instructor.map((instructor) => (
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-once="true"
              key={instructor.id}
              className=" group  border-slate-300 overflow-hidden  hover:bg-purple-300 shadow-purple-400 "
            >
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-full h-60 object-cover "
              />
              <div className="px-3  text-blue-950   py-4 flex justify-between items-center">
                <div className="">
                  <h3 className="dark:text-white text-lg font-bold  px-2 py-[3px] rounded">
                    {instructor.name}
                  </h3>
                  <h4 className=" dark:text-white font-mono">
                    {instructor.profession}
                  </h4>
                </div>
                <div className="   bg-blue-100 rounded-full p-1.5 ">
                  <ShareIcon className="  " />
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
