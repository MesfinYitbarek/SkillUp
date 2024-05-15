import React from "react";
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

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="bg-sky-950 w-full text-white flex flex-col justify-between items-center p-8 gap-3">
      <div className=" pb-2  sm:flex justify-between pt-6  gap-20 text-white">
        <div className="sm:w-auto pb-2 lg:w-[400px]  ">
          <Link
            to={"/"}
            className="font-bold text-2xl sm:text-3xl flex 
          gap-2 items-center text-sky-600"
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
                      bg-blue-600 mt-9 text-white p-2 px-4 rounded-md"
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
                    href={data.link}
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
            </ul>
          }
        </div>
        <div>
          <h1 className=" mb-8 text-2xl font-bold hover:text-blue-500">
            Catagories
          </h1>
          <ul>
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
        <div className="">
          <h1 className=" mb-8 text-2xl font-bold hover:text-blue-500">
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
            <p className="">
              {" "}
              <Link>
                <FacebookIcon />
              </Link>{" "}
              <Link>
                <InstagramIcon />
              </Link>{" "}
              <Link>
                <XIcon />
              </Link>{" "}
              <Link>
                <TelegramIcon />
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
      <div className=" pb-6 mb-0 text-center">
        Copyright &copy; {date} SkillUp. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
