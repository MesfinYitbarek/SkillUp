import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Authentication/Signup";
import About from "./components/About/About";
import SignIn from "./components/Authentication/Signin";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Contact from "./components/Contact/Contact";
import Courses from "./components/Courses/Courses";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Student from "./components/StudentDashboard/Student";
import UpdateProfile from "./components/Profile/updateProfile";
import Instructor from "../src/Containers/UserContainers/Instructor";
import CreateCourse from "./components/Courses/CreateCourse";
import CreateCatagory from "./components/Admin/CreateCatagory";
import ContactDisplay from "./components/Contact/ContactDisplay";
import InstructorCourse from "./components/InstructorDashboard/InstructorCourses";
import Users from "./components/Admin/Users";
import Catagory from "./components/Admin/Catagory";
import AdminContainer from "./Containers/AdminContainer";
import CategoryUpdate from "./components/CourseCatagory/CatagoryUpdate";
import AddUsers from "./components/Admin/AddUsers";
import Test from "./components/Courses/Course Details/CourseDetails";
import CourseLesson from "./components/Courses/Course Details/Course Lesson";
import StudentContainer from "./Containers/UserContainers/StudentContainer";
import EditCategory from "./components/Admin/UpdateCatagory";
import EditUser from "./components/Admin/UpdateUsers";
import EditCourse from "./components/InstructorDashboard/EditCourse";
import CreateLesson from "./components/Courses/Course Details/Lesson/CreateLesson";
const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:categoryName" element={<Courses />} />
        <Route path="/catagory" element={<Catagory />} />
        <Route path={`/courseDetails/:courseId`} element={<Test />} />
        <Route path={`/create-lesson/:courseId`} element={<CreateLesson />} />
        <Route path={`course-lesson/:courseId`} element={<CourseLesson />} />
        <Route path={`course-lesson/:courseId/:lessonId`} element={<CourseLesson />} />
        <Route path={`course-edit/:courseId`} element={<EditCourse />} />

        {/* Common Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Route>

        {/* Role-Based Private Routes */}
        <Route element={<PrivateRoute allowedRoles={["student"]} />}>
          <Route path="/student" element={<StudentContainer />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["instructor"]} />}>
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/instructor-courses" element={<InstructorCourse />} />
          <Route path="/create-course" element={<CreateCourse />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/create-catagory" element={<CreateCatagory />} />
          <Route path="/update-catagory" element={<CategoryUpdate />} />
          <Route path="/contact-display" element={<ContactDisplay />} />
          <Route path="/update-catagory/:id" element={<EditCategory />} />
          <Route path="/update-user/:id" element={<EditUser />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-users" element={<AddUsers />} />
          <Route path="/admin" element={<AdminContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
