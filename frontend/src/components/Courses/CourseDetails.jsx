import React, { useState } from "react";
import Button from "@mui/material/Button";
import img from "../../assets/background image/pexels-artempodrez-4492127.jpg";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
const contentData = {
  content1:
    "This is the content for button 1. It can contain any text, images, or other components.",
  content2:
    "This is the content for button 2. You can customize the content for each button.",
  content3:
    "This is the content for button 3. Click any button to see its content displayed below.",
};

function Test() {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <div className="flex flex-col   ">
      <Header />
      <div className=" flex flex-col gap-4  h-[300px] justify-center pl-20  bg-sky-950 text-white">
        <div>
          <button className=" bg-green-500 text-white px-5 rounded-2xl  py-0.5 mb-2">
            Catagory
          </button>
          <h1 className=" font-bold text-4xl pb-3">Course title</h1>
          <p className=" opacity-65">Short description</p>
        </div>
        <div className=" flex gap-4">
          <img
            src={img}
            alt="profile"
            className=" h-[40px] w-[40px] object-cover rounded-full"
          />
          <h1>Duration</h1>
          <h1>Enrolled student</h1>
          <h1>Rating</h1>
        </div>
      </div>
      <div>
        <img src={img} className=" w-[70%] h-[70%] pl-16 pt-9 " alt="image" />
      </div>
      <div className="flex pl-16 text-2xl text-sky-950 font-semibold ">
        <button
          onClick={() => handleClick(1)}
          className=" px-20  focus:border-b-blue-600 focus:text-blue-700 border-b-4 "
        >
          Course Info
        </button>
        <button
          onClick={() => handleClick(2)}
          className=" px-20 focus:border-b-blue-600 focus:text-blue-700  border-b-4 "
        >
          Curriculam
        </button>
        <button
          onClick={() => handleClick(3)}
          className=" h-16 px-20 focus:border-b-blue-600 focus:text-blue-700 border-b-4"
        >
          Reviews
        </button>
      </div>
      <div className="my-8 mb-40 px-20">
        {activeButton && (
          <h1 variant="body1">{contentData[`content${activeButton}`]}</h1>
        )}
      </div>
      <div className=" rounded-md text-sky-900 absolute top-72 right-12 p-9 min-w-[260px] bg-slate-100 ">
        <div className=" py-3 flex flex-col font-bold bg-slate-100  gap-3">
          <h1 className=" text-xl">Price</h1>
          <button className=" bg-blue-500 text-white  rounded-md px-3 py-2 ">
            Enroll Now
          </button>
        </div>
        <hr />
        <div className="flex mt-7  flex-col gap-3">
          <h1>Level</h1>
          <h1> 11 Total Enrolled</h1>
          <h1>Duration</h1>
          <h1>Last Updated</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Test;
