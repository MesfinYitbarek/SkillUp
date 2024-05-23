import React from "react";
import DarkMode from "./DarkMode";
import { FaCaretDown } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./MenuData";
import { useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import SignOut from "../Profile/SignOut";

const Catagories = [
  {
    id: 1,
    name: "Computer Science",
    link: "/#",
  },
  {
    id: 2,
    name: "Business",
    link: "/#",
  },
  {
    id: 3,
    name: "History",
    link: "/#",
  },
  {
    id: 4,
    name: "Business",
    link: "/#",
  },
  {
    id: 5,
    name: "Business",
    link: "/#",
  },
];

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = React.useState(false);
  const navigate = useNavigate(); // Import useNavigate

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [catagory, setCatagory] = React.useState([]);

  React.useEffect(() => {
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
    if (showMenu && !event.target.closest('.sm:hidden')) {
      setShowMenu(false);
    }
  };


  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu]); 

  const handleCategoryClick = (catagoryName) => {
    // Navigate to the courses page for the selected category
    navigate(`/courses/${catagoryName}`); 
  };

  return (
    <header className="bg-slate-100 dark:bg-gray-800 py-5 dark:text-white duration-200 relative font-serif shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button onClick={toggleMenu} className="block sm:hidden mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link to={"/"} className="flex items-center gap-2 text-sky-600 font-bold text-2xl sm:text-3xl">
            <span className=" -mr-2 text-4xl ml-8">S</span>kill
            <span className="text-black dark:text-white -ml-2">Up.</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <div className={`sm:hidden fixed top-0 left-0 z-50 bg-white dark:bg-gray-800 p-4 shadow-md w-[30%] h-screen overflow-y-auto ${showMenu ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col gap-4 text-sky-900 dark:text-white">
              {Menu.map((data) => (
                <li key={data.id} className="hover:bg-slate-200">
                  <Link to={data.link} className="hover:text-blue-600 group font-mono" onClick={toggleMenu}>
                    <span className="bg-left-bottom bg-gradient-to-r from-sky-500 to-sky-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      {data.name}
                    </span>
                  </Link>
                </li>
              ))}      
            </ul>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden sm:block">
            <ul className="flex flex-row sm:gap-10 items-center text-sky-900 dark:text-white">
              {Menu.map((data) => (
                <li key={data.id} className="hover:bg-slate-100">
                  <Link to={data.link} className="hover:text-blue-600 group font-mono">
                    <span className="bg-left-bottom bg-gradient-to-r from-sky-500 to-sky-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      {data.name}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="group relative bg-white dark:bg-gray-600 cursor-pointer border-2 py-1/2 px-9">
                <a href="#" className="object-cover flex items-center gap-[2px] py-1">
                  <DashboardIcon className="-ml-4 mr-1 text-blue-600" />
                  Catagories
                  <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180 ml-3" />
                  </span>
                </a>
                <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                  <ul className="">
                    {catagory.map((data) => (
                      <li key={data.id} onClick={() => handleCategoryClick(data.name)}>
                        <a href="#" className="inline-block w-full rounded-md p-2 hover:bg-gray-200">
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
            <input
              type="text"
              placeholder="Search For Courses"
              className="sm:w-[200px] sm:group-hover:w-[300px] transtion-all duration-300  border-2 border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
            />
            <IoMdSearch
              className="text-gray-500 group-hover:primary absolute top-1/2 -translate-y-1/2 right-3"
            />
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
                    <Link to={`/${currentUser.role.toLowerCase()}`} className=" hover:bg-slate-200 py-1 px-3" ><h3>My Account</h3></Link>  <hr />
                    <Link to={"/profile"} className=" hover:bg-slate-200 py-1 px-3"> <h3>Profile</h3></Link> <hr />
                    <h2 className=" hover:bg-slate-200 py-1 px-3"><SignOut  /></h2>
                    
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
    </header>
  );
};

export default Header;