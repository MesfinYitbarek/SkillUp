import React, { useState, useEffect } from "react";
import DarkMode from "./DarkMode";
import { FaCaretDown, FaPhone } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./MenuData";
import { useSelector } from "react-redux";
import SignOut from "../Profile/SignOut";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";
import PhoneIcon from "@mui/icons-material/Phone";
import { useSearch } from "../../SearchContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useSearch();
  const [catagory, setCatagory] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const fetchCatagory = async () => {
      try {
        const response = await fetch("/api/courses/catagory");
        const data = await response.json();
        setCatagory(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCatagory();
  }, []);

  const handleClickOutside = (event) => {
    if (showMenu && !event.target.closest(".sm:hidden")) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMenu]);

  const handleCategoryClick = (catagoryName) => {
    navigate(`/courses/${catagoryName}`);
  };

  return (
    <header className="">
      <div>
        <div className=" hidden text-sm sm:flex justify-between items-center dark:bg-gray-700  bg-blue-800 py-2 text-white px-16 pr-36">
          <div className=" items-center flex gap-5">
            <h1>
              <PhoneIcon fontSize="small" />
              +2519-75364420
            </h1>
            <h1>
              <EmailIcon fontSize="small" /> skillup@gmail.com
            </h1>
          </div>
          <div className=" flex items-center gap-6 text-[10px]">
            <FacebookIcon className=" hover:text-blue-500" fontSize="small" />
            <XIcon className=" hover:text-blue-500" fontSize="small" />
            <InstagramIcon
              className=" hover:text-blue-500"
              fontSize="small"
            />
            <TelegramIcon className=" hover:text-blue-500" fontSize="small" />
          </div>
        </div>
        <div className="bg-slate-100 dark:bg-gray-800 py-4 dark:text-white duration-200 relative font-serif ">
          <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                className="block sm:hidden mr-4 z-50"
              >
                {showMenu ? (
                  <CloseIcon className="h-6 w-6 text-blue-800 dark:text-white" />
                ) : (
                  <MenuIcon className="h-6 w-6 text-blue-800 dark:text-white" />
                )}
              </button>
              <Link
                to={"/"}
                className="flex items-center gap-2 text-blue-800 font-extrabold italic text-2xl sm:text-3xl"
              >
                <span className="-mr-2 text-4xl ml-8">S</span>kill
                <span className="text-black dark:text-white -ml-2">Up.</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {/* Mobile Menu */}
              <div
                className={`sm:hidden fixed top-0 left-0 z-40 bg-white dark:bg-gray-800 p-4 shadow-md bg-gradient-to-tr from-blue-200 via-gray-200 to-blue-200  h-screen overflow-y-auto transition-transform duration-300 ease-in-out ${
                  showMenu ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="mt-16 mb-6">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      placeholder="Search For Courses"
                      className="w-full border-2 border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-blue-500 dark:border-gray-500 dark:bg-gray-700"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <IoMdSearch
                        className="text-gray-500 hover:text-blue-500"
                        size={24}
                      />
                    </button>
                  </form>
                </div>
                <ul className="flex flex-col gap-6 text-blue-800 dark:text-white mt-16">
                  {Menu &&
                    Menu.map((data) => (
                      <li
                        key={data.id}
                        className="hover:bg-slate-200 p-2 rounded"
                      >
                        <Link
                          to={data.link}
                          className="hover:text-blue-800 group font-mono text-lg"
                          onClick={toggleMenu}
                        >
                          <span className="bg-left-bottom bg-gradient-to-r from-sky-500 to-sky-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                            {data.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  <li className="group bg-white dark:bg-gray-600 cursor-pointer border-2 p-2 rounded">
                    <a
                      href="#"
                      className="object-cover flex items-center gap-[2px] py-1"
                    >
                      <DashboardIcon className="mr-2 text-blue-800" />
                      Categories
                      <span>
                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180 ml-3" />
                      </span>
                    </a>
                    <ul className="mt-2 space-y-2">
                      {catagory &&
                        catagory.map((data) => (
                          <li
                            key={data.id}
                            onClick={() => handleCategoryClick(data.name)}
                            className="pl-4"
                          >
                            <a
                              href="#"
                              className="block p-2 hover:bg-gray-200 rounded"
                            >
                              {data.name}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Desktop Menu */}
              <nav className="hidden sm:block">
                <ul className="flex flex-row sm:gap-10 items-center text-sky-900 dark:text-white">
                  {Menu &&
                    Menu.map((data) => (
                      <li key={data.id} className="hover:bg-slate-100">
                        <Link
                          to={data.link}
                          className="hover:text-blue-800 group font-mono"
                        >
                          <span className="bg-left-bottom bg-gradient-to-r from-sky-500 to-sky-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                            {data.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  <li className="group relative bg-white dark:bg-gray-600 cursor-pointer border-2 py-1/2 px-9">
                    <a
                      href="#"
                      className="object-cover flex items-center gap-[2px] py-1"
                    >
                      <DashboardIcon className="-ml-4 mr-1 text-blue-800" />
                      Categories
                      <span>
                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180 ml-3" />
                      </span>
                    </a>
                    <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                      <ul className="">
                        {catagory &&
                          catagory.map((data) => (
                            <li
                              key={data.id}
                              onClick={() => handleCategoryClick(data.name)}
                            >
                              <a
                                href="#"
                                className="inline-block w-full rounded-md p-2 hover:bg-gray-200"
                              >
                                {data.name}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </nav>

              {/*Search bar */}
              <div className="relative group hidden sm:block">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search For Courses"
                    className="sm:w-[200px] sm:group-hover:w-[300px] transtion-all duration-300 border-2 border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
                  />
                  <button type="submit">
                    <IoMdSearch className="text-gray-500 group-hover:primary absolute top-1/2 -translate-y-1/2 right-3" />
                  </button>
                </form>
              </div>
              <Link to="/profile" className="flex items-center">
                {currentUser ? (
                  <div className="group mr-10 relative">
                    <img
                      className=" rounded-full h-9 w-9 object-cover"
                      src={currentUser.avatar}
                      alt="profile"
                    />
                    <div
                      className="absolute z-[9999] 
                         right-3  hidden
                        group-hover:block w-[160px] 
                        bg-white p-2 text-black shadow-sm  "
                    >
                      <ul className=" flex flex-col gap-3 py-2 ">
                        <Link
                          to={`/${currentUser.role.toLowerCase()}`}
                          className=" hover:bg-slate-200 py-1 px-3"
                        >
                          <h3>My Account</h3>
                        </Link>{" "}
                        <hr />
                        <Link
                          to={"/profile"}
                          className=" hover:bg-slate-200 py-1 px-3"
                        >
                          {" "}
                          <h3>Profile</h3>
                        </Link>{" "}
                        <hr />
                        <h2 className=" hover:bg-slate-200 py-1 px-3">
                          <SignOut />
                        </h2>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className=" mr-10">
                    <Stack spacing={2} direction="row" className="mt-4 sm:mt-0">
                      <Button variant="contained">Login</Button>
                    </Stack>
                  </div>
                )}
              </Link>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
