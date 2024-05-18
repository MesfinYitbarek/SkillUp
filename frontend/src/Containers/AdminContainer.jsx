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
import Profile from "../components/Profile/Profile";
import SignOut from "../components/Profile/SignOut";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

const navigationItems = [
  { name: "Dashboard", icon: <HomeIcon />, isActive: true }, // Set active item initially
  { name: "Courses", icon: <PlayCircleIcon /> },
  { name: "Categories", icon: <WorkspacesIcon /> },
  { name: "Messages", icon: <MessageIcon /> },
  { name: "Users", icon: <GroupIcon /> },
  { name: "Enrolled Students", icon: <SchoolIcon /> },
  { name: "My Account", icon: <AccountCircleIcon />, link: <Profile /> },
  { name: <SignOut />, icon: <LogoutIcon />, link: <SignOut /> },
];
const  name = "AddCatagory"

const AdminContainer = () => {
  const [activeItem, setActiveItem] = useState(0); // Initial active item index (0 for Dashboard)

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
          <div className=" bg-white h-screen absolute w-[230px] top-0 p-5 text-center flex flex-col gap-4">
            <div className="font-bold  text-blue-500 leading-10  text-lg">
              <h1>
                <CastForEducationIcon className="text-purple-500 mb-2" />{" "}
                SkillUp <span>Admin</span>
              </h1>
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
        <Catagory />
      ) : condtion == "My Account" ? (
        <div className=" text-center  h-screen items-center flex justify-center ">
          {" "}
          <Link to={"/profile"}>
            {" "}
            <h1 className="bg-blue-600 hover:bg-white text-xl hover:text-blue-600 hover:border-2 hover:border-blue-600  text-white font-bold p-6 w-[200px] ">
              Profile <ArrowForward className=" ml-5" />
            </h1>
          </Link>
        </div>
      ) : condtion == "Log Out" ? (
        <SignOut />
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminContainer;
