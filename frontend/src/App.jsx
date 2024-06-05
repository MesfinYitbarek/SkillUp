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
import CategoryUpdate from "./components/Catagory/CatagoryUpdate";
import AddUsers from "./components/Admin/AddUsers";
import Test from "./components/Courses/Course Details/CourseDetails";
import CourseLesson from "./components/Courses/Course Details/Course Lesson";
import StudentContainer from "./Containers/UserContainers/StudentContainer";
import EditCategory from "./components/Admin/UpdateCatagory";
import EditUser from "./components/Admin/UpdateUsers";
import EditCourse from "./components/InstructorDashboard/EditCourse";
import CreateLesson from "./components/Courses/Course Details/Lesson/CreateLesson";
import CreateQuiz from "./components/Courses/Course Details/Lesson/Quiz/CreateQuiz";
import Quiz from "./components/Courses/Course Details/Lesson/Quiz/Quiz";
import Grade from "./components/InstructorDashboard/Grade";
import Grades from "./components/StudentDashboard/Grade";
import InstructorLesson from "./components/InstructorDashboard/InstructorLesson";
import UpdateLesson from "./components/Courses/Course Details/Lesson/LessonEdit";
import InstructorQuiz from "./components/InstructorDashboard/InstructorQuiz";
import ChangePassword from "./components/Authentication/ChangePassword";
import CreateAssignment from "./components/Courses/Course Details/Lesson/Assignment/CreateAssignment";
import Assignment from "./components/Courses/Course Details/Lesson/Assignment/Assignment";
import Students from "./components/InstructorDashboard/Students";

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

        {/* Common Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/:lessonId/quiz" component={Quiz} />
          <Route path="/lessons/:courseId/:lessonId/quiz" element={<Quiz />} />
          <Route path={`/create-lesson/:courseId`} element={<CreateLesson />} />

          <Route path="/course/:courseId/grades" element={<Grades />} />
          <Route
            path="/course-lesson/:courseId/:lessonId?"
            element={<CourseLesson />}
          />

          <Route
            path="/lessons/:lessonId/assignment"
            element={<Assignment />}
          />
        </Route>


        {/* Role-Based Private Routes */}
        <Route element={<PrivateRoute allowedRoles={["student"]} />}>
          <Route path="/student" element={<StudentContainer />} />
        </Route>


        <Route element={<PrivateRoute allowedRoles={["instructor"]} />}>
          <Route
            path="/create-assignment/:lessonId"
            element={<CreateAssignment />}
          />
          <Route path={`scores`} element={<Grade />} />
          <Route path="/quiz/:lessonId" element={<InstructorQuiz />} />
          <Route path={`course-edit/:courseId`} element={<EditCourse />} />
          <Route path={`students/:courseId`} element={<Students />} />
          <Route path={`lesson-edit/:lessonId`} element={<UpdateLesson />} />
          <Route
            path="/courses/:courseId/:lessonId?/quiz/create"
            element={<CreateQuiz />}
          />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/instructor-courses" element={<InstructorCourse />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route
            path="/course-lessons/:courseId"
            element={<InstructorLesson />}
          />
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
