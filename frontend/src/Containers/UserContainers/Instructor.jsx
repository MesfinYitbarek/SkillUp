import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/Common/DashboardHeader";
import { useSelector } from "react-redux";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import InstructorCourse from "../../components/InstructorDashboard/InstructorCourses";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Add } from "@mui/icons-material";
import CreateCourse from "../../components/Courses/CreateCourse"
const navigationItems = [
  { name: "My Courses", icon: <PlayCircleIcon />, isActive: true },
  { name: "Create Course", icon: <Add /> },
];

const Instructor = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleClick = (index) => {
    setActiveItem(index);
    if (isSmallScreen) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  var condtion = "";
  const { currentUser } = useSelector((state) => state.user);

  const renderContent = () => {
    const activeItemName = navigationItems[activeItem].name;
    switch (activeItemName) {
      case "My Courses":
        return <InstructorCourse />;
      case "Create Course":
        return <CreateCourse/>;
      default:
        return null;
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex flex-grow">
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-blue-800 text-white p-2 rounded-md"
        >
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <aside
          className={`bg-white h-screen fixed w-[230px] top-0 p-5 text-center flex flex-col gap-4 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } z-40 ${isSmallScreen ? "shadow-lg" : ""}`}
        >
          <div className="font-bold text-blue-800 leading-10 text-lg mt-16">
            <Link to="/">
              <CastForEducationIcon className="text-blue-800 mb-2" /> SkillUp{" "}
              <span>Instructor</span>
            </Link>
          </div>
          <nav className="text-start flex p-2 flex-col gap-2">
            {navigationItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleClick(index)}
                className={`
                  flex gap-3 text-sm cursor-pointer py-2 px-3 rounded-md
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
              className="opacity-60 pl-3 py-1 rounded-md hover:bg-slate-300"
            >
              <AccountCircleIcon className="mr-1" /> My account
            </Link>
          </nav>
        </aside>
        <main
          className={`flex-grow transition-all duration-300 ease-in-out ${
            !isSmallScreen && isSidebarOpen ? "ml-[230px]" : "ml-0"
          } w-full`}
        >
          <div className="mt-16 p-4 max-w-full overflow-x-auto">
            <div className="max-w-7xl mx-auto">{renderContent()}</div>
          </div>
        </main>
      </div>
      {isSmallScreen && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Instructor;
