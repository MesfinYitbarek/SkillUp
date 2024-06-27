import React from "react";
import { useState } from "react";
import DashboardHeader from "../components/Common/DashboardHeader";
import { useSelector } from "react-redux";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Home from "../components/Admin/Home";
import Courses from "../components/Admin/Courses"
import Catagory from "../components/Admin/Catagory";
import ContactDisplay from "../components/Contact/ContactDisplay";
import Users from "../components/Admin/Users";
import SignOut from "../components/Profile/SignOut";
import { Link } from "react-router-dom";
import EnrolledStudents from "../components/Admin/EnrolledStudents";


const navigationItems = [
  { name: "Dashboard", icon: <HomeIcon />, isActive: true }, // Set active item initially
  { name: "Courses", icon: <PlayCircleIcon /> },
  { name: "Categories", icon: <WorkspacesIcon /> },
  { name: "Messages", icon: <MessageIcon /> },
  { name: "Users", icon: <GroupIcon /> },
  { name: "Enrolled Students", icon: <SchoolIcon /> },
  { name: <SignOut />, icon: <LogoutIcon />, link: <SignOut /> },
];
const  name = "AddCatagory"

const AdminContainer = () => {
  const [activeItem, setActiveItem] = useState(0); 

  const handleClick = (index) => {
    setActiveItem(index);
  };

  var condtion = "";
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="  bg-gray-100 pb-12 min-h-screen ">
      <div>
        <div>
          <DashboardHeader />
          <div className=" bg-white h-screen fixed w-[230px] top-0 p-5 text-center flex flex-col gap-4">
            <div className="font-bold  text-blue-800 leading-10  text-lg">
              <Link to={'/'}>
                <CastForEducationIcon className="text-blue-800 mb-2" />{" "}
                SkillUp <span>Admin</span>
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
              <Link to={'/profile'} className=" opacity-60 pl-3 py-1 rounded-md hover:bg-slate-300"><AccountCircleIcon  className="mr-1"/> My account</Link>
            </div>
          </div>
        </div>
      </div>
      {condtion == "Dashboard" ? (
        <Home />
      ) : condtion == "Courses" ? (
        <Courses />
      ) : condtion == "Categories" ? (
        <Catagory />
      ) : condtion == "Messages" ? (
        <ContactDisplay />
      ) : condtion == "Users" ? (
        <Users />
      )  : condtion == "Enrolled Students" ? (
        <EnrolledStudents />
      )  : condtion == "Log Out" ? (
        <SignOut />
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminContainer;
