import React, { useState } from "react";
import Header from "../Common/Header";
import { useSelector } from "react-redux";
import Footer from "../Common/Footer";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import { Link } from "react-router-dom";
import SignOut from "./SignOut";
import ChangePassword from "../Authentication/ChangePassword";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleOpenChangePassword = () => {
    setIsChangePasswordOpen(true);
  };

  return (
    <div className=" font-lato">
      <div
        className={`${
          isChangePasswordOpen ? " brightness-50" : "brightness-100"
        } bg-slate-50 `}
      >
        <Header />
        <div>
          <div className="  ml-36 mt-3 font-bold sm:mt- text-2xl sm:text-3xl">
            <h1>
              Hi,{" "}
              <span className="  text-blue-800">{currentUser.username}</span>
            </h1>
          </div>

          <div className=" sm:flex justify-center flex flex-col sm:flex-row sm:mb-8 items-center sm:gap-6 lg:gap-36">
            
            <div className=" bg-white px-5 mt-5  py-6 text-center rounded-lg sm:ml-36 border border-slate-300 shadow-md w-[260px] sm:w-[350px]  ">
              <div className=" mb-4 font-bold text-xl text-blue-800">
                <h1>Personal Details</h1>
              </div>
              <div className=" mb-5 flex flex-col items-center  ">
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className=" object-cover h-36 w-36 border-4 border-double border-blue-300 rounded-full"
                />
                <h2 className=" text-3xl font-bold">{currentUser.username}</h2>
              </div>
              <hr />
              <div className=" mt-5 text-lg text-blue-800 font-semibold">
                <Link
                  to={"/update-profile"}
                  className="   hover:bg-blue-800 hover:text-white border rounded-md border-blue-800  p-1.5 px-4"
                >
                  Update Profile
                </Link>
              </div>
              <div className=" mt-3">
                <SignOut />
              </div>
            </div>
            <div className=" text-7xl p-3 font-lato   ">
              <div className=" flex flex-col mb-10">
                <Link
                  to={`/${currentUser.role}`}
                  className=" mt-12 text-lg text-blue-800 font-semibold"
                >
                  <h1 className=" hover:bg-blue-800  hover:text-white border rounded-md border-blue-600 p-1.5 px-4 text-center">
                    My Courses <DoubleArrowIcon className=" ml-1" />
                  </h1>
                </Link>
                <button
                  onClick={handleOpenChangePassword}
                  className="mt-12 text-lg text-blue-800 font-semibold"
                >
                  <h1 className="hover:bg-blue-800 hover:text-white border rounded-md border-blue-600 p-1.5 px-4">
                    Change Password 
                  </h1>
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <div className=" absolute top-[15%] right-[30%]">
        {isChangePasswordOpen && (
          <ChangePassword onClose={() => setIsChangePasswordOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default Profile;
