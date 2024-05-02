import React from "react";
import image from "../../assets/pngwing.com.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Hero = () => {
  return (
    <div
      className=" flex justify-between  
    bg-gradient-to-r from-slate-100
    to-slate-50 p-16 "
    >
      <div className=" mt-6">
        <h1 className=" text-6xl font-bold text-sky-900">
          The Future of <span className=" text-blue-600">Online Learning</span>{" "}
          is Here.
        </h1>
        <p className=" mt-4 opacity-70 ">
          Borem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattisBorem ipsum dolor sit amet
          consectetur adipiscing area we followelit.
        </p>
        <button
          className=" hover:bg-white hover:text-sky-950 hover:border-2
                      hover:border-sky-800   
                      bg-blue-600 mt-9 text-white p-2 px-4 rounded-md"
        >
          Explore Courses <ArrowForwardIcon />
        </button>
      </div>
      <div>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
