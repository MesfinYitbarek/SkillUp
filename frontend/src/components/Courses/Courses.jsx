import React from "react";
import { useState, useEffect } from "react";
import Header from "../Common/Header";
import CourseListing from "./CourseListing";
import Footer from "../Common/Footer";
import img from "../../assets/background image/pexels-vlada-karpovich-4050315.jpg";
import { Link } from "react-router-dom";
import Search from "../Common/Search";

import CourseCatagories from "../CourseCatagory/CourseCatagories";
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [catagorizedCourses, setCatagorizaedCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
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

  const handleCheck = (term) => {
    setSelectedCategories(term);
    // Filter courses based on Catagory term
    const catagorizedCourses = courses.filter((course) => {
      return course.catagory.includes(term);
    });
    setCatagorizaedCourses(catagorizedCourses);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Filter courses based on search term
    const filteredCourses = courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(term.toLowerCase()) ||
        course.description.toLowerCase().includes(term.toLowerCase()) ||
        course.catagory.toLowerCase().includes(term.toLowerCase())
      );
    });
    setFilteredCourses(filteredCourses);
  };

  return (
    <div className=" bg-slate-50">
      <div>
        <Header />
        <div
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "screen",
            width: "100%",
            // filter: "brightness(0.5)",
          }}
          className=" h-[50px] brightness-50 opacity-100 pl-16 items-center py-10 pb-16"
        ></div>

        <div className=" absolute top-36 left-20">
          <h1 className=" lg:text-4xl  text-white font-bold">Courses</h1>
        </div>
        <div>
          <Search onSearch={handleSearch} />
        </div>
        <div className=" flex  ">
          <CourseCatagories onCategoryChange={handleCheck} />
          <CourseListing
            searchTerm={searchTerm}
            selectedCategories={selectedCategories}
            catagorizedCourses={catagorizedCourses}
            filteredCourses={filteredCourses}
            courses={courses}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
