import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardHeader from "../../components/Common/DashboardHeader";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import InstructorCourse from "../../components/InstructorDashboard/InstructorCourses";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SignOut from "../../components/Profile/SignOut";
import { Button } from "@mui/material";

const navigationItems = [
  { name: "My Courses", icon: <PlayCircleIcon />, isActive: true },
  { name: "Log Out", icon: <LogoutIcon />, component: <SignOut /> },
];

const Instructor = () => {
  const [activeItem, setActiveItem] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  const handleClick = (index) => {
    setActiveItem(index);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <aside className="fixed bg-white h-screen w-[230px] top-0 p-5 flex flex-col gap-4 shadow-md">
        <Link to="/" className="font-bold text-blue-800 text-lg flex items-center justify-center">
          <CastForEducationIcon className="mr-2" />
          SkillUp <span className="ml-1">Instructor</span>
        </Link>
        <nav className="flex flex-col gap-2">
          {navigationItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => handleClick(index)}
              className={`
                flex items-center gap-3 text-sm cursor-pointer py-2 px-3 rounded-md
                ${
                  index === activeItem
                    ? "bg-blue-800 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-200"
                } 
              `}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
          <Link
            to="/profile"
            className="flex items-center opacity-60 pl-3 py-2 rounded-md hover:bg-slate-300"
          >
            <AccountCircleIcon className="mr-2" /> My account
          </Link>
        </nav>
      </aside>

      <main className="flex-1 ml-[230px] p-8 pt-24">
        <DashboardHeader />
        <div className="mb-6">
          <Link to="/create-course">
            <Button variant="contained" color="primary">
              Add Course
            </Button>
          </Link>
        </div>
        {activeItem === 0 ? <InstructorCourse /> : navigationItems[activeItem].component}
      </main>
    </div>
  );
};

export default Instructor;