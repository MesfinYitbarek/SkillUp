import React from "react";
import Header from "../Common/Header";
import { useSelector } from "react-redux";
import Footer from "../Common/Footer";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import { Link } from "react-router-dom";
import SignOut from "./SignOut";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" bg-slate-50 ">
      <Header />
      <div>
        <div className="  text-center mt-4 sm:mt-12 text-2xl sm:text-5xl">
          <h1>
            Hi, <span className=" text-purple-500">{currentUser.username}</span>
          </h1>
          
        </div>

        <div className=" sm:flex flex flex-col sm:flex-row sm:mb-8 items-center sm:gap-6 lg:gap-64">
          <div className=" bg-white px-5 mt-10  py-6 text-center rounded-lg sm:ml-36 border border-slate-300 shadow-md w-[260px] sm:w-[350px]  sm:h-[400px] ">
            <div className=" mb-4 font-semibold text-xl text-blue-800">
              <h1>Personal Details</h1>
            </div>
            <div className=" mb-5 flex flex-col items-center  ">
              <img
                src={currentUser.avatar}
                alt="profile"
                className=" h-36 w-36 border-4 border-double border-blue-300 rounded-full"
              />
              <h2 className=" text-3xl font-bold">{currentUser.username}</h2>
            </div>
            <hr />
            <div className=" mt-12 text-lg text-blue-600 font-semibold">
              <Link
                to={"/update-profile"}
                className="   hover:bg-blue-500 hover:text-white border rounded-md border-blue-600  p-1.5 px-4"
              >
                Update Profile
              </Link>
              
            </div >
            <div className=" mt-3">
            <SignOut />
            </div>
            
          </div>
          <div className=" text-7xl p-3   ">
            <div className=" flex flex-col mb-10">
              <Link
                to={"/student"}
                className=" mt-12 text-lg text-blue-600 font-semibold"
              >
                <h1 className=" hover:bg-blue-500  hover:text-white border rounded-md border-blue-600 p-1.5 px-4">
                  My Courses <DoubleArrowIcon className=" ml-14" />
                </h1>
              </Link>
              <Link to={"/update-profile"} className=" mt-12 text-lg text-blue-600 font-semibold">
                <h1 className=" hover:bg-blue-500 hover:text-white border rounded-md border-blue-600 p-1.5 px-4">
                  Change Password <DoubleArrowIcon className=" ml-3" />
                </h1>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
