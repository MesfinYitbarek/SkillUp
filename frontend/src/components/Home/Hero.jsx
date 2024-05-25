import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/pngwing.com.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import img from "../../assets/background image/pexels-vlada-karpovich-4050315.jpg";
const Hero = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "screen",
          width: "100%",
          filter: "brightness(0.6)",
        }}
        className="  h-[600px] sm:h-screen  "
      ></div>
      <div
        className=" sm:flex justify-between px-16  
      dark:text-white dark:bg-gray-800 "
      >
        <div className=" absolute top-52 mt-6 ">
          <h1
            data-aos="zoom-in"
            data-aos-duration="500"
            data-aos-once="true"
            className=" text-5xl w-[60%] sm:text-7xl font-bold text-white dark:text-white"
          >
            The Future of{" "}
            <span className=" text-blue-600 ">Online Learning</span> is Here.
          </h1>

          <button
            data-aos="fade-up"
            data-aos-delay="300"
            className=" hover:bg-white hover:text-sky-950 hover:border-2
                      hover:border-sky-800 font-semibold dark:bg-white dark:text-blue-900  
                      bg-blue-600 mt-9 text-white p-2 px-4 rounded-md"
          >
            <Link to={"/courses"}>
              Explore Courses <ArrowForwardIcon />
            </Link>
          </button>
        </div>
      </div>
      <div className=" flex mt-10 mb-5 pb-10 justify-between text-center text-blue-950 font-bold text-lg   items-center px-2 sm:px-32 h-[200px] shadow-xl ">
        <div className=" flex flex-col items-center sm:w-[170px] text-center gap-4  rounded-lg bg-slate-200 p-7">
          <div className=" bg-slate-100 text-blue-500  p-2 rounded-full h-[50px] w-[50px]">
            <PlayCircleIcon fontSize="large" />
          </div>
          <div>
            <h1>Courses</h1>
            <h1>10</h1>
          </div>
        </div>
        <div className="flex flex-col items-center w-[170px] text-center gap-4  rounded-lg bg-slate-200 p-7">
          <div className=" bg-slate-100 text-blue-500  p-2 rounded-full h-[50px] w-[50px]">
            <SchoolIcon />
          </div>
          <div>
            <h1>Students</h1>
            <h1>10</h1>
          </div>
        </div>
        <div className="flex flex-col items-center w-[170px] text-center gap-4  rounded-lg bg-slate-200 p-7">
          <div className=" bg-slate-100 text-blue-500  p-2 rounded-full h-[50px] w-[50px]" >
            <GroupIcon />
          </div>
          <div>
            <h1>Instructors</h1>
            <h1>10</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
