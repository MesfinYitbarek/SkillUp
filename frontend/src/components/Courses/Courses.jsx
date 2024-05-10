import React from "react";
import Header from "../Common/Header";
import CourseListing from "./CourseListing";
import Footer from "../Common/Footer";
export default function Courses() {
  return (
    <div>
      <Header />
      <div>
        <div className=" flex pl-16 items-center h-[230px] bg-gradient-to-r from-purple-500 to-pink-500">
          <h1 className=" lg:text-4xl  text-white font-bold">Courses</h1>
        </div>
        <CourseListing />
        <Footer/>
      </div>
    </div>
  );
}
