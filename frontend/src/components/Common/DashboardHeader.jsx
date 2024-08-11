import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Notifications, SearchOutlined } from "@mui/icons-material";
import DarkMode from "./DarkMode";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import MessageIcon from "@mui/icons-material/Message";
import { Badge, Stack } from "@mui/material";
import { io } from "socket.io-client";
import { useSearch } from "../../SearchContext";

const DashboardHeader = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const { searchTerm, setSearchTerm } = useSearch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Fetch initial message count
    fetch("/api/contact/newMessageCount")
      .then((response) => response.json())
      .then((data) => setNewMessageCount(data.count))
      .catch((error) => console.error("Error fetching message count:", error));

    // Setup Socket.IO
    const socket = io("http://localhost:4444"); // Replace with your server URL

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("updateMessageCount", (data) => {
      setNewMessageCount(data.count);
    });

    return () => {
      socket.disconnect();
    };
  }, [newMessageCount, currentUser._id]);

  return (
    <div className="bg-blue-800  p-6 py-2 fixed top-0 left-0 w-full ">
      <div className="bg-white ml-[230px] flex justify-between items-center py-2  px-2 sm:px-10">
        <div className="font-bold sm:flex gap-1 hidden">
          <CalendarViewDayIcon />
          <h1 className="opacity-70">
            Hello <span>{currentUser.username}</span>
            <span className="px-2 py-1">
              <EmojiPeopleIcon className="text-yellow-500" />
            </span>
          </h1>
        </div>

        <div className="flex items-center">
          <button className="p-1 px-2 bg-blue-800 text-white">
            <SearchOutlined />
          </button>
          <input
            type="text"
            placeholder="Search here"
            className="px-2 py-1.5 w-[60%] sm:w-full bg-gray-100 border-gray-400"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div
          className={`  gap-16 sm:flex hidden  justify-between items-center`}
        >
          <div
            className={`${
              currentUser.role == "instructor"
                ? "hidden"
                : currentUser.role == "student"
                ? "hidden"
                : "flex"
            }
          bg-gray-100 px-2 py-1.5`}
          >
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
