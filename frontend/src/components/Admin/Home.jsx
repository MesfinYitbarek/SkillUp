import React, { useState, useEffect } from "react";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CheckBoxOutlineBlank, CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [student, setStudent] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [date, setDate] = useState(new Date());
  const [filtered, setFiletered] = useState([]);
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
        const filteredData = data.filter((course) => course.rating >= 4); // Filter courses with rating > 4
        setFiletered(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  const homeData = [
    {
      title: "Courses",
      number: courses.length,
      icon: <PlayCircleIcon className="text-blue-800" />,
    },
    {
      title: "Instructors",
      number: instructor.length,
      icon: <GroupIcon className="text-blue-800" />,
    },
    {
      title: "Students",
      number: student.length,
      icon: <SchoolIcon className="text-blue-800" />,
    },
  ];

  return (
    <div className="ml-60 pt-24 p-12 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center gap-6">
        {homeData.map((data, index) => (
          <div
            key={index}
            className="bg-white py-5 px-6 shadow-md flex items-center gap-5 border-l-4 border-blue-800 w-48 text-blue-800 font-bold rounded-md"
          >
            <div className="flex-grow">
              <h4 className="text-lg">{data.title}</h4>
              <h1 className="text-2xl">{data.number}</h1>
            </div>
            <div>{data.icon}</div>
          </div>
        ))}
      </div>
      <div className=" flex items-center justify-center gap-2">
      <div className="mt-8 bg-white w-[50%] p-6 shadow-md rounded-md">
        <ReactCalendar
          onChange={setDate}
          value={date}
          className="w-full text-inherit border-none"
        />
      </div>
      <div className=" bg-white m-5 p-3 shadow-md rounded-lg">
        <h1 className=" text-xl
         font-bold p-1 px-3">Top courses</h1>
        <table className="   text-blue-800   border-separate border-spacing-y-2 min-w-[600px]">
          {filtered &&
            filtered.map((data) => (
              <tr className="  hover:bg-gray-200 ">
                <td className=" p-1 flex items-center gap-1"><CheckCircle/> {data.title}</td>
                <td className=" px-10">{data.instructor}</td>
                <td className=" px-10">{data.courseName}</td>
                <td>
                  <Link
                    to={`/courseDetails/${data._id}`}
                    className="inline-block px-3 py-1.5 border-blue-800 border  text-blue-800 font-bold rounded "
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
        </table>
      </div>
      </div>
    </div>
  );
};

export default Home;
