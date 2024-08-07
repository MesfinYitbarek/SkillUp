import React from "react";
import { useState } from "react";
import DashboardHeader from "../../components/Common/DashboardHeader";
import { useSelector } from "react-redux";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import InstructorCourse from "../../components/InstructorDashboard/InstructorCourses";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SignOut from "../../components/Profile/SignOut";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const navigationItems = [
  { name: "My Courses", icon: <PlayCircleIcon />, isActive: true },
  { name: <SignOut />, icon: <LogoutIcon />, link: <SignOut /> },
];

const Instructor = () => {
  const [activeItem, setActiveItem] = useState(0);

  const handleClick = (index) => {
    setActiveItem(index);
  };

  var condtion = "";
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className=" bg-gray-100 pb-12 min-h-screen ">
      <div>
        <div>
          <DashboardHeader />
          <div className=" fixed bg-white h-screen  w-[230px] top-0 p-5 text-center flex flex-col gap-4">
            <div className="font-bold  text-blue-800 leading-10  text-lg">
              <Link to={"/"}>
                <CastForEducationIcon className="text-blue-800 mb-2" /> SkillUp{" "}
                <span>Instructor</span>
              </Link>
            </div>
            <div className=" text-start flex p-2 flex-col gap-2">
              {navigationItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleClick(index)}
                  className={`
            bg-blue-800 flex gap-3 text-sm  cursor-pointer   py-2 px-3 rounded-md
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
      <div className=" ml-72 pt-24">
        <Stack direction="row" spacing={2}>
          <Link to={"/create-course"}>
            <Button variant="contained" color="primary">
              Add Course
            </Button>
          </Link>
        </Stack>
      </div>
      <div className="ml-52">
        {condtion == "My Courses" ? (
          <InstructorCourse />
        ) : condtion == "Log Out" ? (
          <SignOut />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Instructor;
