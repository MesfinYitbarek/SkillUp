import React from "react";
import Header from "../Common/Header";
import Hero from "./Hero";
import TopCourses from "./TopCourses";
import TopInstructors from "./TopInstructors";
import Footer from "../Common/Footer";
import CourseListing from "../Courses/CourseListing";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <CourseListing />
      {/* <TopCourses/> */}
      <TopInstructors/>
      <Footer />
    </div>
  );
};

export default Home;
