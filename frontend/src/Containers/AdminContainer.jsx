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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Home from "../components/Admin/Home";
import Courses from "../components/Admin/Courses"
import Catagory from "../components/Admin/Catagory";
import ContactDisplay from "../components/Contact/ContactDisplay";
import Users from "../components/Admin/Users";
import SignOut from "../components/Profile/SignOut";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const navigationItems = [
  { name: "Dashboard", icon: <HomeIcon />, isActive: true }, // Set active item initially
  { name: "Courses", icon: <PlayCircleIcon /> },
  { name: "Categories", icon: <WorkspacesIcon /> },
  { name: "Messages", icon: <MessageIcon /> },
  { name: "Users", icon: <GroupIcon /> },
  { name: <SignOut />, icon: <LogoutIcon />, link: <SignOut /> },
];
const  name = "AddCatagory"

const AdminContainer = () => {
  const [activeItem, setActiveItem] = useState(0); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Add this state
  const isMobile = useMediaQuery("(max-width:768px)");
  
  const handleClick = (index) => {
    setActiveItem(index);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  var condtion = "";
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-gray-100 pb-12 min-h-screen">
      <div>
        <DashboardHeader />
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 bg-blue-800 text-white p-2 rounded-md"
          >
            <MenuIcon />
          </button>
        )}
        <div
          className={`bg-white h-screen fixed w-[230px] top-0 p-5 text-center flex flex-col gap-4 transition-transform duration-300 ease-in-out ${
            isMobile ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : ""
          }`}
        >
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
      <div className={`${isMobile ? "mt-16" : "ml-[230px]"} p-4`}></div>
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
      )  : condtion == "Log Out" ? (
        <SignOut />
      ) : (
        ""
      )}
      
    </div>
  );
};

export default AdminContainer;
