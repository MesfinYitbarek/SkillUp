import React from "react";
import { Link } from "react-router-dom";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import image3 from "../../assets/background image/pexels-peter-olexa-2214257-4012966.jpg";
import image2 from "../../assets/background image/pexels-august-de-richelieu-4260485.jpg";
const unique = [
  {
    id: 1,
    title: "Expert Instructors",
    description:
      "We partner with industry-leading professionals to deliver engaging and up-to-date courses.",
    icon: "👨‍🏫",
  },
  {
    id: 2,
    title: "Flexible Learning",
    description:
      "Learn at your own pace, on your own schedule, with on-demand courses and self-paced learning.",
    icon: "🕰️",
  },
  {
    id: 3,
    title: "Interactive Content",
    description:
      "Our courses combine video lectures, quizzes, interactive exercises, and downloadable resources to keep you engaged.",
    icon: "🖥️",
  },
  {
    id: 4,
    title: "Supportive Community",
    description:
      "Connect with fellow learners and instructors through our online forums and discussion boards.",
    icon: "🤝",
  },
];

const About = () => {
  return (
    <div className="dark:text-white dark:bg-gray-800">
      <Header />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[40vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${image3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl font-bold mb-4 text-shadow-lg"
          >
            About SkillUp
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-2xl text-shadow"
          >
            Empowering Lifelong Learners Since 2023
          </motion.p>
        </div>
      </motion.div>

      <div className="dark:bg-gray-800 dark:text-white bg-slate-50 flex flex-col gap-20">
        {/* How It Started Section */}
        <div className="px-14 sm:px-20 flex flex-col md:flex-row gap-24 justify-between items-center py-20">
          <div className="md:w-1/2">
            <h1 className="text-red-400 font-bold mb-4">How It Started</h1>
            <h5 data-aos="zoom-in" className="mb-5 font-semibold text-5xl text-blue-800">
              Empowering Lifelong Learners
            </h5>
            <p className="text-justify text-lg leading-relaxed">
              We're an online learning platform dedicated to making high-quality
              education accessible to everyone, everywhere. Whether you're a
              seasoned professional looking to upskill or a complete beginner
              eager to explore new horizons, SkillUp provides the tools and
              resources you need to achieve your learning goals.
            </p>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="bg-blue-100 rounded-lg p-8 shadow-lg">
              <img
                data-aos="fade-left"
                data-aos-once="true"
                className="rounded-lg w-full h-auto"
                src={image2}
                alt="Students learning"
              />
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="flex flex-col text-white items-center bg-blue-800 p-8 py-16">
          <h2 className="text-center font-semibold mb-10 text-4xl">OUR STORY</h2>
          <hr data-aos="fade-right" className="bg-white h-1 w-[20%] mb-10" />
          <p className="text-center text-lg max-w-3xl leading-relaxed">
            SkillUp was founded in 2023 by a team of passionate educators and
            lifelong learners. We believe that education shouldn't be limited by
            traditional barriers like location, time constraints, or cost. With
            SkillUp, you can learn at your own pace, on your own terms, from the
            comfort of your home.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="flex flex-col items-center mx-10 dark:text-white text-slate-900 p-8 py-20">
          <h2 className="font-semibold mb-5 text-4xl">OUR MISSION</h2>
          <hr data-aos="fade-right" className="bg-blue-800 h-1 w-[20%] mb-10" />
          <div className="border-4 border-blue-800 p-8 py-20 text-center max-w-4xl rounded-lg shadow-lg">
            <p className="text-xl leading-relaxed">
              Our mission is to democratize education by providing affordable,
              high-quality online courses taught by industry experts. We strive to
              create an engaging and supportive learning environment that fosters
              curiosity, growth, and personal development.
            </p>
          </div>
        </div>

        {/* What Makes Us Unique Section */}
        <div className="mx-14 sm:mx-20 my-20 flex flex-col">
          <h2 className="dark:text-white text-4xl font-bold text-blue-800 mb-10 text-center">
            What Makes Us Unique?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {unique.map((data) => (
              <div
                key={data.id}
                className="group dark:text-white dark:bg-gray-600 text-blue-800 hover:scale-105 transition-all duration-300 flex flex-col text-center items-center pt-7 bg-white hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white shadow-lg p-6 rounded-lg"
              >
                <div className="text-5xl mb-4">{data.icon}</div>
                <h2 className="text-center mb-2 font-bold text-xl">{data.title}</h2>
                <hr
                  data-aos="fade-left"
                  data-aos-delay="200"
                  className="bg-blue-500 h-1 mb-3 w-[60%]"
                />
                <p className="font-semibold p-1 rounded-md">{data.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join the SkillUp Community Section */}
        <div className="dark:bg-gray-700 bg-slate-300 px-10 sm:px-20 py-16">
          <h2 className="mb-5 dark:text-white text-3xl font-bold text-blue-800 text-center">
            Join the SkillUp Community
          </h2>
          <p className="text-center text-lg mb-10">
            Ready to embark on your learning journey? Sign up for a free account
            today and explore our vast library of courses!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/courses" className="w-full sm:w-auto">
              <button className="w-full bg-blue-800 py-3 px-6 text-white font-semibold rounded-md hover:bg-white hover:text-blue-800 border-2 border-blue-800 transition duration-300 flex items-center justify-center">
                Browse Courses <ArrowForward className="ml-2" />
              </button>
            </Link>
            <Link to="/sign-up" className="w-full sm:w-auto">
              <button className="w-full bg-blue-800 py-3 px-6 text-white font-semibold rounded-md hover:bg-white hover:text-blue-800 border-2 border-blue-800 transition duration-300 flex items-center justify-center">
                Sign Up for Free <ArrowForward className="ml-2" />
              </button>
            </Link>
            <Link to="/contact-us" className="w-full sm:w-auto">
              <button className="w-full bg-blue-800 py-3 px-6 text-white font-semibold rounded-md hover:bg-white hover:text-blue-800 border-2 border-blue-800 transition duration-300 flex items-center justify-center">
                Contact Us <ArrowForward className="ml-2" />
              </button>
            </Link>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="dark:text-white px-10 sm:px-20 text-xl sm:text-4xl py-6 text-blue-800 pb-12 font-bold text-center">
          <h1>We're excited to be part of your learning journey!</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;