import React from "react";
import Header from "../Common/Header";
import Hero from "./Hero";
import TopCourses from "./TopCourses";
import TopInstructors from "./TopInstructors";
import Footer from "../Common/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <TopCourses/>
      <TopInstructors/>
      <Footer />
    </div>
  );
};

export default Home;
