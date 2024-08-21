import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import img from "../../assets/background image/pexels-vlada-karpovich-4050315.jpg";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Hero = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [student, setStudent] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const { ref: coursesRef, inView: coursesInView } = useInView({
    triggerOnce: true,
  });
  const { ref: studentsRef, inView: studentsInView } = useInView({
    triggerOnce: true,
  });
  const { ref: instructorsRef, inView: instructorsInView } = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/users");
        const data = await response.json();
        const filteredStudent = data.filter((user) => user.role === "student");
        const filteredInstructor = data.filter(
          (user) => user.role === "instructor"
        );
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
    <div className="dark:bg-gray-800 bg-slate-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center text-white"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 px-4 sm:px-1 w-full max-w-4xl mx-auto text-center sm:text-start">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold font-roboto mb-4 text-shadow-lg"
          >
            Elevate Your Learning Journey with{" "}
            <span className="text-blue-00">Our Online Courses.</span>
          </motion.h1>
          <motion.div
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
              <Link to="/courses" className="flex items-center">
                Explore Courses <ArrowForwardIcon className="ml-2" />
              </Link>
            </button>
          </motion.div>
        </div>
      </motion.div>
      <div className="bg-gradient-to-tr from-slate-100 to-purple-100 dark:bg-gray-800 shadow-xl my-6 flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 md:gap-24 text-center text-blue-800 font-bold text-lg py-10 px-4 sm:px-8 md:px-16">
        <StatCard
          ref={coursesRef}
          icon={<PlayCircleIcon fontSize="large" />}
          title="Courses"
          count={courses.length}
          inView={coursesInView}
        />
        <StatCard
          ref={studentsRef}
          icon={<SchoolIcon fontSize="large" />}
          title="Students"
          count={student.length}
          inView={studentsInView}
        />
        <StatCard
          ref={instructorsRef}
          icon={<GroupIcon fontSize="large" />}
          title="Instructors"
          count={instructor.length}
          inView={instructorsInView}
        />
      </div>
    </div>
  );
};

const StatCard = React.forwardRef(({ icon, title, count, inView }, ref) => (
  <div
    ref={ref}
    className="flex flex-col items-center w-full sm:w-[170px] text-center gap-4 rounded-lg dark:bg-gray-800 dark:text-white bg-white p-7"
  >
    <div className="bg-slate-100 text-blue-800 p-2 rounded-full h-[50px] w-[50px] flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h2>{title}</h2>
      <h3 className="text-4xl">
        {inView && <CountUp end={count} duration={4.5} />}
      </h3>
    </div>
  </div>
));

export default Hero;