import React from "react";
import Header from "../Common/Header";
import CourseListing from "./CourseListing";
import Footer from "../Common/Footer";
import img from "../../assets/background image/pexels-vlada-karpovich-4050315.jpg";
import { DoubleArrow } from "@mui/icons-material";
import { Link } from "react-router-dom";
export default function Courses() {
  return (
    <div className=" bg-slate-50">
      <div>
        <Header />
        <div
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "screen",
            width: "100%",
            // filter: "brightness(0.5)",
          }}
          className=" h-[160px] brightness-50 opacity-100 pl-16 items-center py-10 "
        >
          
        </div>
        <div className=" absolute top-36 left-20">
            <h1 className=" lg:text-5xl  text-white font-bold">
              Courses
            </h1>
            <h2 className=" text-xl font-bold mt-2 text-white">
              SkillUp <DoubleArrow />{" "}
              <span className=" text-slate-300">Courses</span>{" "}
            </h2>
          </div>
        <CourseListing />
        <Link  to="/create-course">
          create course
        </Link>
        <Footer />
      </div>
    </div>
  );
}
