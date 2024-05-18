import React from "react";
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const homeData = [
  {
    title: "Courses",
    number: 46,
    icon:<PlayCircleIcon />,
  },
  {
    title: "Instrucors",
    number: 100,
    icon:<GroupIcon />,
  },
  {
    title: "Students",
    number: 80,
    icon:<SchoolIcon />,
  },
  {
    title: "Enrolled",
    number: 27,
    icon:<AccountCircleIcon />,
  },
];
const Home = () => {
  return (
    <div className=" ml-60 p-12 ">
      <div className=" flex justify-between items-center">
        {homeData.map((data) => (
          <div className=" bg-white py-5  shadow-md flex items-center gap-5  border-blue-700 w-[200px] text-blue-700 font-bold">
            <div className="border-l-2 px-5 border-blue-700">
            <h4>{data.title}</h4>
            <h1>{data.number}</h1>
            
            </div>
            <div className="">{data.icon}</div>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default Home;
