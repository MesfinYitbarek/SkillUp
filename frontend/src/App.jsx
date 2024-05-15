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
import Student from "./components/StudentDashboard/Student"
import UpdateProfile from "./components/Profile/updateProfile";
import Instructor from "./components/InstructorDashboard/Instructor";
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
        <Route  element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile />} />
          <Route path="/Student" element={<Student />} />
          <Route path="/instructor" element={<Instructor/>} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
