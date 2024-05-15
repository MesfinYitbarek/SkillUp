import React from "react";
import Header from "../Common/Header";
import CourseListing from "./CourseListing";
import Footer from "../Common/Footer";
import img from "../../assets/background image/pexels-vlada-karpovich-4050315.jpg";
import { DoubleArrow } from "@mui/icons-material";
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
            opacity: "90%",
            
          }}
          className="  pl-16 items-center py-10 "
        >
          <h1 className=" lg:text-5xl  text-slate-200 font-bold">Courses</h1>
          <h2 className=" text-xl font-bold mt-2 text-slate-50">SkillUp <DoubleArrow /> <span className=" text-blue-800">Courses</span>  </h2>
        </div>
        <CourseListing />
        <Footer />
      </div>
    </div>
  );
}
