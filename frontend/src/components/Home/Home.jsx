import React from "react";
import Header from "../Common/Header";
import Hero from "./Hero";
import TopCourses from "./TopCourses";
import TopInstructors from "./TopInstructors";
import Footer from "../Common/Footer";
import About from "./About";
import GetStarted from "./GetStarted";
import Review from "./review";
const Home = () => {
  return (
    <div className=" dark:bg-gray-500 ">
      <Header />
      <Hero />
      <TopCourses/>
      <About/>
      <TopInstructors/>
      <Review />
      <GetStarted/>
      <Footer />
    </div>
  );
};

export default Home;
