import React from "react";
import Header from "../Common/Header";
import { useSelector } from "react-redux";
import Footer from "../Common/Footer";
import { Link } from "react-router-dom";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" bg-slate-50 ">
      <Header />
      <div className=" flex items-center sm:gap-64">
        <div className=" bg-white px-5 my-16  py-6 text-center rounded-lg sm:ml-36 border border-slate-300 max-w-[350px]  sm:h-[400px] ">
          <div className=" mb-2 font-semibold text-lg">
            <h1>Personal Details</h1>
          </div>
          <div className=" mb-5 flex flex-col items-center  ">
            <img
              src={currentUser.avatar}
              alt="profile"
              className=" h-36 w-36 border-4 border-double border-slate-200 rounded-full"
            />
            <h2 className=" text-3xl font-bold">{currentUser.username}</h2>
          </div>
          <hr />
          <div className=" mt-12 text-lg text-blue-600 font-semibold">
            <Link
              to={"/update-profile"}
              className=" border rounded-md border-blue-600 p-1.5 px-4"
            >
              Update Profile
            </Link>
          </div>
        </div>
        <div className=" text-7xl p-3   ">
          <h1>
            Hi, <span className=" text-purple-500">{currentUser.username}</span>
          </h1>
          <p className=" text-sky-900">Welcome back!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
