import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import img from "../../assets/background image/pexels-vlada-karpovich-4050315.jpg";
import CountUp from "react-countup";
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = React.useState([]);
  const [student, setStudent] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const { ref: coursesRef, inView: coursesInView } = useInView({ triggerOnce: true });
  const { ref: studentsRef, inView: studentsInView } = useInView({ triggerOnce: true });
  const { ref: instructorsRef, inView: instructorsInView } = useInView({ triggerOnce: true });

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/users");
        const data = await response.json();
        const filteredStudent = data.filter((user) => user.role === 'student');
        const filteredInstructor = data.filter((user) => user.role === 'instructor');
        setStudent(filteredStudent);
        setInstructor(filteredInstructor);
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses/courses");
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="dark:bg-gray-800">
      <div
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "screen",
          width: "100%",
          filter: "brightness(0.7)",
        }}
        className="h-[600px] sm:h-screen "
      ></div>
      <div className="sm:flex justify-between px-16 dark:text-white dark:bg-gray-800 ">
        <div className="absolute top-52 mt-6">
          <h1
            data-aos="zoom-in"
            data-aos-duration="500"
            data-aos-once="true"
            className="text-5xl mb-6 w-[60%] sm:text-7xl font-bold text-white dark:text-white"
          >
            The <span className=" text-blue-00"> Future</span> of{" "}
            <span className=" text-blue-00 ">Online Learning</span> is <span className=" "> Here.</span>
          </h1>

          <button
            data-aos="fade-up"
            data-aos-delay="300"
            className="hover:bg-white hover:text-sky-950 hover:border-2
                      hover:border-sky-800 font-semibold dark:bg-white dark:text-blue-900  
                      bg-blue-800 mt-9 text-white p-2 px-4 rounded-md"
          >
            <Link to={"/courses"}>
              Explore Courses <ArrowForwardIcon />
            </Link>
          </button>
        </div>
      </div>
      <div className="dark:bg-gray-800 flex mt-10 mb-5 pb-10 justify-between text-center text-blue-800 font-bold text-lg items-center px-2 sm:px-32 h-[200px]  shadow-xl">
        <div ref={coursesRef} className="flex flex-col items-center sm:w-[170px] text-center gap-4 rounded-lg bg-slate-200 p-7">
          <div className="bg-slate-100 text-blue-800 p-2 rounded-full h-[50px] w-[50px]">
            <PlayCircleIcon fontSize="large" />
          </div>
          <div>
            <h1>Courses</h1>
            <h1 className=" text-4xl">
              {coursesInView && <CountUp end={courses.length} duration={4.5} />}
            </h1>
          </div>
        </div>
        
        <div ref={studentsRef} className="flex flex-col items-center w-[170px] text-center gap-4 rounded-lg bg-slate-200 p-7">
          <div className="bg-slate-100 text-blue-800 p-2 rounded-full h-[50px] w-[50px]">
            <SchoolIcon />
          </div>
          <div>
            <h1>Students</h1>
            <h1 className=" text-4xl">
              {coursesInView &&  <CountUp end={student.length} duration={4.5} /> }
            </h1>
          </div>
        </div>
        <div ref={instructorsRef} className="flex flex-col items-center w-[170px] text-center gap-4 rounded-lg bg-slate-200 p-7">
          <div className="bg-slate-100 text-blue-800 p-2 rounded-full h-[50px] w-[50px]">
            <GroupIcon fontSize="large" />
          </div>
          <div>
            <h1>Instructors</h1>
            <h1 className=" text-4xl">
             {coursesInView &&  <CountUp end={instructor.length} duration={4.5} /> }
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
