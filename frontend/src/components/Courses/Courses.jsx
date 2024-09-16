import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Common/Header";
import { motion } from "framer-motion";
import CourseListing from "./CourseListing";
import Footer from "../Common/Footer";
import Search from "../Common/Search";
import CourseCatagories from "../CourseCatagory/CourseCatagories";
import image3 from "../../assets/background image/pexels-peter-olexa-2214257-4012966.jpg";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [catagorizedCourses, setCatagorizaedCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { categoryName } = useParams();

  const handleSearchHeader = (term) => {
    setSearch(term);
    const filtered = courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(term.toLowerCase()) ||
        course.description.toLowerCase().includes(term.toLowerCase()) ||
        course.catagory.toLowerCase().includes(term.toLowerCase())
      );
    });
    setFiltered(filtered);
  };

  useEffect(() => {
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
  }, []);

  const handleCheck = (term) => {
    setSelectedCategories(term);
    const catagorizedCourses = courses.filter((course) => {
      return course.catagory.includes(term);
    });
    setCatagorizaedCourses(catagorizedCourses);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filteredCourses = courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(term.toLowerCase()) ||
        course.description.toLowerCase().includes(term.toLowerCase()) ||
        course.catagory.toLowerCase().includes(term.toLowerCase())
      );
    });
    setFilteredCourses(filteredCourses);
  };

  const displayedCourses = categoryName
    ? courses.filter((course) => course.catagory.includes(categoryName))
    : courses;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-800 dark:to-gray-900 dark:text-white">
      <Header onSearch={handleSearchHeader} />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[30vh] sm:h-[40vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${image3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center px-4">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-lg"
          >
            Explore Our Courses
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-shadow"
          >
            Expand your knowledge with our wide range of courses
          </motion.p>
        </div>
      </motion.div>
     
      <div className="container mx-auto px-4 py-8">
        <Search onSearch={handleSearch} />
        
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <aside className="w-full md:w-1/4">
            <CourseCatagories onCategoryChange={handleCheck} />
          </aside>
          
          <main className="w-full md:w-3/4">
            <CourseListing
              search={search}
              filtered={filtered}
              searchTerm={searchTerm}
              selectedCategories={selectedCategories}
              catagorizedCourses={catagorizedCourses}
              filteredCourses={filteredCourses}
              courses={displayedCourses}
            />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}