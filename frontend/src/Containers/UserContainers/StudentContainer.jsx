import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/Common/DashboardHeader";
import SignOut from "../../components/Profile/SignOut";
import LogoutIcon from "@mui/icons-material/Logout";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import StudentCourses from "../../components/StudentDashboard/Student";
const navigationItems = [
  { name: "My Courses", icon: <PlayCircleIcon />, isActive: true },
  { name: <SignOut />, icon: <LogoutIcon />, link: <SignOut /> },
];

const StudentContainer = () => {
  const [activeItem, setActiveItem] = useState(0);

  const handleClick = (index) => {
    setActiveItem(index);
  };
  var condtion = "";
  return (
    <div className="bg-gray-100 pb-12 min-h-screen ">
      <div>
        <div className="">
          <DashboardHeader />
          <div className=" bg-white h-screen absolute w-[230px] top-0 p-5 text-center flex flex-col gap-4">
            <div className="font-bold  text-blue-500 leading-10  text-lg">
              <Link to={"/"}>
                <CastForEducationIcon className="text-purple-500 mb-2" />{" "}
                SkillUp <span>Student</span>
              </Link>
            </div>
            <div className=" text-start flex p-2 flex-col gap-2">
              {navigationItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleClick(index)}
                  className={`
            bg-blue-500 flex gap-3 text-sm  cursor-pointer   py-2 px-3 rounded-md
            ${
              index === activeItem
                ? `text-white ${(condtion = item.name)} `
                : `bg-white  text-gray-500 hover:bg-gray-200`
            } 
          `}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
              <Link
                to={"/profile"}
                className=" opacity-60 pl-3 py-1 rounded-md hover:bg-slate-300"
              >
                <AccountCircleIcon className="mr-1" /> My account
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-52">
        {condtion == "My Courses" ? (
          <StudentCourses />
        ) : condtion == "Log Out" ? (
          <SignOut />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default StudentContainer;
