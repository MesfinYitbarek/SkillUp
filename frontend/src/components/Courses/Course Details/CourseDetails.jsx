import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CachedIcon from "@mui/icons-material/Cached";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import SchoolIcon from "@mui/icons-material/School";
import img from "../../../assets/background image/pexels-artempodrez-4492127.jpg";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import CourseInfo from "./CourseInfo";
import Lesson from "./Lesson";
import { Star } from "@mui/icons-material";
import { FaClock } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const contentData = {
  content1: <CourseInfo  />,
  content2: <Lesson />,
  content3:
    "This is the content for button 3. Click any button to see its content displayed below.",
};

function Test() {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  console.log(enrolledCourses);
  console.log(course);
  console.log(courseId);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`/api/courses/courseDetails/${courseId}`);
      const data = await response.json();
      setCourse(data);
    };

    fetchCourse();
  }, [courseId]);

  const handleEnrollment = async (e) => {
    try {
      const res = await fetch("/api/enrollment/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: currentUser.username,
          email: currentUser.email,
          courseId: courseId,
          courseName: course.title,
        }),
      });
      setLoading(false);
      setError(null);
      navigate(`/course-lesson/${courseId}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      navigate("/sign-in");
    }
  };
  return (
    <div className="flex flex-col   ">
      <Header />
      {course ? (
        <div>
          <div className=" flex flex-col gap-4  h-[300px] justify-center pl-20  bg-sky-950 text-white">
            <div>
              <button className=" bg-green-500 text-white px-5 rounded-2xl  py-0.5 mb-2">
                {course.catagory}
              </button>
              <h1 className=" font-bold text-4xl pb-3">{course.title}</h1>
              <p className=" opacity-65">{course.description} </p>
            </div>
            <div className=" flex items-center gap-4">
              <div className=" border-2 rounded-full border-white">
                <img
                  src={course.instructorImage}
                  alt="profile"
                  className="  h-[40px] w-[40px] object-cover rounded-full"
                />
              </div>

              <h1 className=" flex items-center">
                <FaClock className=" mr-3" />
                {course.duration}
              </h1>
              <h1>
                <SchoolIcon className=" mr-3" />
                Enrolled student no
              </h1>
              <h1 className=" ">
                {" "}
                <Star className="text-yellow-400" /> {course.rating}
              </h1>
            </div>
            <div className=" rounded-md text-sky-900 absolute top-72 right-12 p-9 min-w-[260px] bg-slate-100 ">
              <div className=" py-3 flex flex-col font-bold bg-slate-100  gap-3">
                {course.isPaid ? (
                  <span className="text-blue-600 text-xl mb-3 font-bold">
                    &#8377; {course.price}
                  </span>
                ) : (
                  <span className="text-green-500 text-xl mb-3 font-bold">
                    Free
                  </span>
                )}
                {course.isPaid ? (
                  <button
                    disabled={loading}
                    className=" bg-blue-500 text-white  rounded-md px-3 py-2 "
                  >
                    Enroll Now
                  </button>
                ) : (
                  <button
                    onClick={handleEnrollment}
                    className=" bg-blue-500 text-white  rounded-md px-3 py-2 "
                  >
                    {loading ? "Loading..." : "Enroll Now"}
                  </button>
                )}
              </div>
              <hr />
              <div className="flex mt-7  flex-col gap-5">
                <h1>
                  <AlignVerticalBottomIcon className=" mr-3" />
                  {course.level}
                </h1>
                <h1>
                  <SchoolIcon className=" mr-2" /> 11 Total Enrolled
                </h1>
                <h1 className=" flex items-center">
                  <FaClock className=" mr-3" />
                  {course.duration}
                </h1>
                <h1>
                  <CachedIcon />
                  <span className=" mx-1">Last Updated</span>
                  {new Date(course.updatedAt).getFullYear()}-
                  {String(new Date(course.updatedAt).getMonth() + 1).padStart(
                    2,
                    "0"
                  )}
                  -
                  {String(new Date(course.updatedAt).getDate()).padStart(
                    2,
                    "0"
                  )}
                </h1>
              </div>
            </div>
          </div>
          <div>
            <img
              src={img}
              className=" w-[70%] h-[500px] pl-16 pt-9 "
              alt="image"
            />
          </div>
        

      <div className="flex pl-16 text-2xl text-sky-950 font-semibold ">
        <button
          onClick={() => handleClick(1)}
          className=" px-20  focus:border-b-blue-600 focus:text-blue-700 border-b-4 "
        >
          Course Info
        </button>
        <button
          onClick={() => handleClick(2)}
          className=" px-20 focus:border-b-blue-600 focus:text-blue-700  border-b-4 "
        >
          Curriculam
        </button>
        <button
          onClick={() => handleClick(3)}
          className=" h-16 px-20 focus:border-b-blue-600 focus:text-blue-700 border-b-4"
        >
          Reviews
        </button>
      </div>
      <div className="my-8 mb-40 px-20">
        {activeButton && (
          <h1 variant="body1">{contentData[`content${activeButton}`]}</h1>
        )}
      </div>
      </div>
      ) : (
        <p className="text-center text-gray-700">Loading course details...</p>
      )}
      <Footer />
    </div>
  );
}

export default Test;
