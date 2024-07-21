import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import img from "../../assets/background image/pexels-ekaterina-bolovtsova-4050083.jpg";

const GetStarted = () => {
  return (
    <div className="relative  h-[400px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4)",
        }}
      />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-down">
          Interested? Join us now
        </h1>
        <Link to='/sign-in'>
          <button className="group relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-blue-500 rounded-full shadow-md">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
              <ArrowForward className="text-2xl" />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">Get Started Now</span>
            <span className="relative invisible">Get Started Now</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default GetStarted;