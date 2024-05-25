import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Notifications, SearchOutlined } from "@mui/icons-material";
import DarkMode from "./DarkMode";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import MessageIcon from "@mui/icons-material/Message";
import { Badge, Stack } from "@mui/material";
import { useState, useEffect } from "react";

const DashboardHeader = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [newMessageCount, setNewMessageCount] = useState(0);

  useEffect(() => {
   
    const intervalId = setInterval(() => {
      fetch('/api/contact/newMessageCount')
        .then(response => response.json())
        .then(data => setNewMessageCount(data.count));
    }, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="bg-blue-500 p-6 py-2 fixed top-0 left-0 w-full ">
      <div className="bg-white ml-[230px] flex justify-between items-center py-2 px-10">
        <div className="font-bold flex gap-1">
          <CalendarViewDayIcon />
          <h1 className="opacity-70">
            Hello <span>{currentUser.username}</span>
            <span className="px-2 py-1">
              <EmojiPeopleIcon className="text-yellow-500" />
            </span>
          </h1>
        </div>

        <div className="flex items-center">
          <button className="p-1 px-2 bg-blue-500 text-white">
            <SearchOutlined />
          </button>
          <input
            type="text"
            placeholder="Search here"
            className="px-2 py-1.5 bg-gray-100 border-gray-400"
          />
        </div>
        <div className="gap-16 flex justify-between items-center">
          <div className="bg-gray-100 px-2 py-1.5">
            <Stack spacing={4} direction="row" sx={{ color: "action.active" }}>
              <Badge color="secondary" badgeContent={0} showZero>
                <Notifications className=" " />
              </Badge>
            </Stack>
          </div>
          <div  className={`bg-gray-100 ${currentUser.role == 'admin'? 'flex' : 'hidden'} px-2 py-1.5`}>
            <Stack spacing={4} direction="row" sx={{ color: "action.active" }}>
              <Badge color="secondary" badgeContent={newMessageCount} showZero>
                <MessageIcon />
              </Badge>
            </Stack>
          </div>

          <Link to={"/profile"}>
            <img
              src={currentUser.avatar}
              alt="profile"
              className="h-8 w-8 rounded-md"
            />
          </Link>

          <div>
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;