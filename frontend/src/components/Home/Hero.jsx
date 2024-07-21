import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import img from "../../assets/background image/pexels-vlada-karpovich-4050315.jpg";
import CountUp from "react-countup";
import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion";
const Hero = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [student, setStudent] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const { ref: coursesRef, inView: coursesInView } = useInView({ triggerOnce: true });
  const { ref: studentsRef, inView: studentsInView } = useInView({ triggerOnce: true });
  const { ref: instructorsRef, inView: instructorsInView } = useInView({ triggerOnce: true });

  useEffect(() => {
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

  useEffect(() => {
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
     
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[80vh] flex items-center  text-white"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 pl-16  ">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="sm:text-7xl text-4xl font-bold mb-4 text-shadow-lg w-[60%]"
          >
            The <span className="text-blue-00">Future</span> of{" "}
            <span className="text-blue-00">Online Learning</span> is <span>Here.</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-2xl text-shadow"
          >
            <button
            
            className="hover:bg-white hover:text-sky-950 hover:border-2
                      hover:border-sky-800 font-semibold dark:bg-white dark:text-blue-900  
                      bg-blue-800 mt-9 text-white p-2 px-4 rounded-md"
          >
            <Link to="/courses">
              Explore Courses <ArrowForwardIcon />
            </Link>
          </button>
          </motion.p>
        </div>
      </motion.div>
      <div className="dark:bg-gray-800 flex mt-10 mb-5 pb-10 justify-between text-center text-blue-800 font-bold text-lg items-center px-2 sm:px-32 h-[200px] shadow-xl">
        <div ref={coursesRef} className="flex flex-col items-center sm:w-[170px] text-center gap-4 rounded-lg bg-slate-200 p-7">
          <div className="bg-slate-100 text-blue-800 p-2 rounded-full h-[50px] w-[50px]">
            <PlayCircleIcon fontSize="large" />
          </div>
          <div>
            <h1>Courses</h1>
            <h1 className="text-4xl">
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
            <h1 className="text-4xl">
              {studentsInView && <CountUp end={student.length} duration={4.5} />}
            </h1>
          </div>
        </div>
        <div ref={instructorsRef} className="flex flex-col items-center w-[170px] text-center gap-4 rounded-lg bg-slate-200 p-7">
          <div className="bg-slate-100 text-blue-800 p-2 rounded-full h-[50px] w-[50px]">
            <GroupIcon fontSize="large" />
          </div>
          <div>
            <h1>Instructors</h1>
            <h1 className="text-4xl">
              {instructorsInView && <CountUp end={instructor.length} duration={4.5} />}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;