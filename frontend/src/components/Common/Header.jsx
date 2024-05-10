import React from "react";
import DarkMode from "./DarkMode";
import { FaCaretDown } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import Menu from "./MenuData";
import { useSelector } from "react-redux";

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
  ,
  {
    id: 5,
    name: "Business",
    link: "/#",
  },
];

const Header = () => {
  const {currentUser} = useSelector(state => state.user)
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div
      className="  xl:flex p-5 flex-wrap justify-between items-center shadow-sm bg-slate-100
    dark:bg-gray-800 dark:text-white duration-200
      relative  xl:py-9  xl:px-6 font-serif "
    >
      <div className=" flex  w-full sm:w-auto mb-4 sm:mb-0">
        <h1></h1>
        <Link
          to={"/"}
          className="font-bold text-2xl sm:text-3xl flex 
          gap-2 items-center text-sky-600"
        >
          <span className=" -mr-2 text-4xl ml-8">S</span>kill
          <span className="text-black dark:text-white -ml-2">Up.</span>
        </Link>
        {/*Menu bar*/}
        <button
          onClick={toggleMenu}
          className={`${
            showMenu ? "hidden" : "absolute right-8 flex sm:hidden"
          }`}
        >
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
        <div>
          <div>
            <ul></ul>
          </div>
        </div>
      </div>
      <div className=" xl:flex px-6 w-full sm:w-auto  ">
        <div>
          <nav>
            <ul
              className={`${
                showMenu
                  ? " flex flex-col absolute right-0 top-0   "
                  : "hidden sm:flex justify-center gap-10 items-center text-sky-900 dark:text-white"
              }`}
            >
              {Menu.map((data) => (
                <li
                  key={data.id}
                  onClick={toggleMenu}
                  className={`${
                    showMenu
                      ? " even:bg-slate-200 flex flex-col h-[50px] w-[200px] p-3 pt-5 z-50 shadow-md shadow-purple-500 bg-slate-100 text-black   "
                      : ""
                  }`}
                >
                  <Link
                    to={data.link}
                    className="hover:text-blue-600 group font-mono"
                  >
                    <span
                      className="  bg-left-bottom bg-gradient-to-r
                    from-sky-500 to-sky-500
                    bg-[length:0%_2px] bg-no-repeat 
                    group-hover:bg-[length:100%_2px] 
                    transition-all duration-500 ease-out"
                    >
                      {data.name}
                    </span>
                  </Link>
                </li>
              ))}

              <li
                className="group relative bg-white dark:bg-gray-600
                    cursor-pointer xl:ml-12 border-2 py-1/2 px-9  "
              >
                <a
                  href="#"
                  className="hidden sm:flex items-center gap-[2px] py-1 "
                >
                  {" "}
                  <DashboardIcon className=" -ml-4 mr-1 text-blue-600" />
                  Catagories
                  <span>
                    <FaCaretDown
                      className="transition-all duration-200
                              group-hover:rotate-180 ml-3"
                    />
                  </span>
                </a>
                <div
                  className="absolute z-[9999] hidden 
                        group-hover:block w-[200px] rounded-md
                        bg-white p-2 text-black shadow-md  "
                >
                  <ul className="">
                    {Catagories.map((data) => (
                      <li key={data.id}>
                        <a
                          href={data.link}
                          className="inline-block w-full rounded-md p-2 hover:bg-sky-600"
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
        </div>
        {/*Search bar */}
        <div className="flex justify-center   items-center ">
          <div className="relative group hidden sm:block">
            <input
              type="text"
              placeholder="Search For Courses"
              className="sm:w-[200px]
                             sm:group-hover:w-[300px] transtion-all 
                             duration-300  border-2
                             border-gray-300 px-2 py-1
                             focus:outline-none focus:border-1
                             focus:border-primary
                             dark:border-gray-500
                             dark:bg-gray-800"
            />
            <IoMdSearch
              className="text-gray-500
           group-hover:primary absolute
           top-1/2 -translate-y-1/2 right-3"
            />
          </div>
        </div>
      </div>

      <Link to="/profile" className=" hidden sm:flex">
        {
          currentUser ? (
            <img className=" rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
          ): (
            <Stack spacing={2} direction="row" className="mt-4 sm:mt-0">
              <Button variant="contained">Login</Button>
            </Stack>
          )
        }
        
      </Link>

      <DarkMode />
    </div>
  );
};

export default Header;
