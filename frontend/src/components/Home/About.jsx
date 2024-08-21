import React from "react";
import image3 from "../../assets/background image/pexels-august-de-richelieu-4260485.jpg";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-blue-900 min-h-screen flex items-center justify-center p-4 font-roboto">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-12">
            <img
              data-aos="zoom-in"
              data-aos-delay="50"
              data-aos-once="true"
              className="w-full h-auto rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              src={image3}
              alt="Students learning"
            />
          </div>
          <div className="md:w-1/2 p-12">
            <div
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-once="true"
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
                Take the next step toward your goals with{" "}
                <span className="text-blue-800">SkillUp</span>.
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Empowering Lifelong Learners in a Changing World.
              </p>
              <Link to="/sign-in">
                <button className=" mt-12 group relative inline-flex items-center justify-start overflow-hidden rounded-full bg-blue-800 px-8 py-3 font-bold text-white transition-all hover:bg-white">
                  <span className="absolute inset-0 rounded-full border-0 border-white transition-all duration-100 ease-linear group-hover:border-[25px]"></span>
                  <span className="relative w-full text-left  text-white transition-colors duration-200 ease-in-out group-hover:text-blue-800">
                    Join For Free <ArrowForward className="ml-2 inline" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;