import React from "react";
import image from "../../assets/pngwing.com.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Hero = () => {
  return (
    <div className=" bg-gradient-to-r from-slate-100 to-slate-50  ">
      <div
        className=" flex justify-between p-16 pl-24 
      dark:text-white dark:bg-gray-800 "
      >
        <div className=" mt-6 ">
          <h1
            data-aos="zoom-in"
            data-aos-duration="500"
            data-aos-once="true"
            className=" text-6xl font-bold text-sky-900 dark:text-white"
          >
            The Future of{" "}
            <span className=" text-blue-600">Online Learning</span>
            is Here.
          </h1>
          <p data-aos="fade-up" className=" mt-4 opacity-70 ">
            Borem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattisBorem ipsum dolor sit amet
            consectetur adipiscing area we followelit.
          </p>
          <button
            data-aos="fade-up"
            data-aos-delay="300"
            className=" hover:bg-white hover:text-sky-950 hover:border-2
                      hover:border-sky-800  dark:bg-white dark:text-blue-900  
                      bg-blue-600 mt-9 text-white p-2 px-4 rounded-md"
          >
            Explore Courses <ArrowForwardIcon />
          </button>
        </div>
        <div>
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
