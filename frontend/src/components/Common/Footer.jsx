import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "./MenuData";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PrintIcon from "@mui/icons-material/Print";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";

const SocialMedia = [
  {
    id: 1,
    name: <FacebookIcon />,
    link: "/#",
  },
  {
    id: 2,
    name:<InstagramIcon />,
    link: "/#",
  },
  {
    id: 3,
    name: <XIcon />,
    link: "/#",
  },
  {
    id: 4,
    name: <TelegramIcon />,
    link: "/#",
  },
];

const Footer = () => {
  const date = new Date().getFullYear();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Import useNavigate


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
    navigate(`/courses/${searchTerm}`); 
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


  const handleCategoryClick = (catagoryName) => {
    // Navigate to the courses page for the selected category
    navigate(`/courses/${catagoryName}`); 
  };
  return (
    <div className="bg-sky-950  w-full text-white flex flex-col justify-between items-center p-8 gap-3">
      <div className=" pb-2  sm:flex justify-between pt-6  gap-20 text-white">
        <div className="sm:w-auto pb-2 lg:w-[400px]  ">
          <Link
            to={"/"}
            className="font-bold italic text-2xl sm:text-3xl flex 
          gap-2 items-center text-blue-500"
          >
            <span className=" -mr-2 mb-2  text-4xl ">S</span>kill
            <span className="text-white dark:text-white -ml-2">Up.</span>
          </Link>
          <div className=" mt-3 ">
            <p>
              SkillUp your journey. Dive into our library of expert-crafted
              online courses. Upskill for your career, learn a new passion, or
              explore anything that interests you. Join our vibrant community
              and empower your potential. It all starts here at SkillUp.
            </p>
            <Link to={"/courses"}>
              <button
                className=" hover:bg-white hover:text-sky-950 hover:border-2
                      hover:border-sky-800  dark:bg-white dark:text-blue-900  
                      bg-blue-800 mt-9 text-white p-2 px-4 rounded-md"
              >
                Explore Courses <ArrowForwardIcon />
              </button>
            </Link>
          </div>
        </div>
        <div>
          <h1 className=" mb-8  text-2xl font-bold hover:text-blue-500">
            Pages
          </h1>
          {
            <ul>
              {Menu.map((data) => (
                <li key={data.id}>
                  <Link
                    to={data.link}
                    className="hover:text-blue-800 group font-mono"
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
            </ul>
          }
        </div>
        <div>
          <h1 className=" mb-8 text-2xl font-bold hover:text-blue-800">
            Catagories
          </h1>
          <ul>
          {catagory.map((data) => (
                      <li key={data.id} onClick={() => handleCategoryClick(data.name)}>
                        <a href="#" className="inline-block w-full rounded-md p-2 hover:bg-blue-800">
                          {data.name}
                        </a>
                      </li>
                    ))}
          </ul>
        </div>
        <div className="">
          <h1 className=" mb-8 text-2xl font-bold hover:text-blue-800">
            Contact
          </h1>
          <div>
            <p>
              <LocationOnIcon className=" mr-3 mb-4" /> CMC Michael, Addis
              Ababa, Ethiopia
            </p>
            <p>
              <LocalPhoneIcon className=" mr-3 mb-4" /> Tel.:+251-975364420
            </p>
            <p>
              <EmailIcon className=" mr-3 mb-4" /> contactskillup@gmail.com
            </p>
            <p className=" flex gap-4">
              
              {
                SocialMedia.map((data)=> (
                  <Link key={data.id} className="hover:text-purple-500">
                  {data.name}
                </Link>
                ))
              }
              
            </p>
          </div>
        </div>
      </div>
      <div className=" pb-6 mb-0 text-center">
        &copy; {date} SkillUp. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
