import React, { useState, useEffect } from "react";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [student, setStudent] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [date, setDate] = useState(new Date());
  const [filtered, setFiltered] = useState([]);

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
        const filteredData = data.filter((course) => course.rating >= 4);
        setFiltered(filteredData);
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
      icon: <PlayCircleIcon className="text-blue-800 text-4xl" />,
    },
    {
      title: "Instructors",
      number: instructor.length,
      icon: <GroupIcon className="text-blue-800 text-4xl" />,
    },
    {
      title: "Students",
      number: student.length,
      icon: <SchoolIcon className="text-blue-800 text-4xl" />,
    },
  ];

  return (
    <div className="w-full pt-24 p-4 sm:p-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {homeData.map((data, index) => (
          <div
            key={index}
            className="bg-white py-6 px-8 shadow-lg flex items-center justify-between gap-5 border-l-4 border-blue-800 text-blue-800 font-bold rounded-lg transition-all duration-300 hover:shadow-xl"
          >
            <div>
              <h4 className="text-lg text-gray-600">{data.title}</h4>
              <h1 className="text-3xl mt-2">{data.number}</h1>
            </div>
            <div>{data.icon}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:items-stretch justify-center gap-8 mt-8">
        <div className="bg-white w-full lg:w-[45%] p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Calendar</h2>
          <ReactCalendar
            onChange={setDate}
            value={date}
            className="w-full text-inherit border-none shadow-md rounded-lg"
          />
        </div>
        <div className="bg-white w-full lg:w-[55%] p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Top Courses</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-gray-600">
                  <th className="px-4 py-2">Course</th>
                  <th className="px-4 py-2">Instructor</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((data) => (
                  <tr key={data._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-4 py-3 flex items-center gap-2">
                      <CheckCircle className="text-green-500" /> {data.title}
                    </td>
                    <td className="px-4 py-3">{data.instructor}</td>
                    <td className="px-4 py-3">{data.catagory}</td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/courseDetails/${data._id}`}
                        className="inline-block px-4 py-2 bg-blue-800 text-white font-bold rounded-md transition-all duration-200 hover:bg-blue-900"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;