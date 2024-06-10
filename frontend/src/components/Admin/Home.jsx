import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = React.useState([]);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState([])
  const [instructor, setInstructor] = useState([])

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/users");
        const data = await response.json();
        const filteredStudent = data.filter((course) => course.role == 'student');
        const filteredInstructor = data.filter((course) => course.role == 'instructor');
        setStudent(filteredStudent)
        setInstructor(filteredInstructor)
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [users]);

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
  }, [courses]);

  const homeData = [
    {
      title: "Courses",
      number: courses.length,
      icon: <PlayCircleIcon />,
    },
    {
      title: "Instrucors",
      number: instructor.length,
      icon: <GroupIcon />,
    },
    {
      title: "Students",
      number: student.length,
      icon: <SchoolIcon />,
    },
    
  ];

  return (
    <div className=" ml-60 pt-24 p-12 ">
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
