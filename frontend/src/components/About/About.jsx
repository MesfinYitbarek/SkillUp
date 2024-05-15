import React from "react";
import Header from "../Common/Header";
import { Link } from "react-router-dom";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Footer from "../Common/Footer";
import image1 from "../../assets/image2.png"
import image2 from "../../assets/image3.png"
import image3 from "../../assets/image1 (1).png"
const About = () => {
  return (
    <div className=" bg-slate-100">
      <Header />
      <div className="  bg-gradient-to-r from-purple-200 to-slate-100 px-20  py-7">
      <h2 className=" mb-5 text-3xl  text-blue-700 font-semibold ">Welcome to SkillUp! </h2>
          
      </div>
      <div className="px-20  flex flex-col gap-20">
        <div className=" flex gap-24  justify-between items-center  ">
          <div className=" ">
          <h5 className=" mb-5 font-semibold text-2xl text-purple-900"> Empowering Lifelong Learners</h5>
          <p className="  text-justify">
            {" "}
            We're an online learning platform dedicated to making high-quality
            education accessible to everyone, everywhere. Whether you're a
            seasoned professional looking to upskill or a complete beginner
            eager to explore new horizons, SkillUp provides the tools and
            resources you need to achieve your learning goals.
          </p>
          </div>
          <img className=" mt-7  md:flex hidden max-w-[500px]" src={image3} alt=" image" />
          
        </div>
        <div className=" bg-purple-200 p-8 py-16">
          <h2 className=" font-semibold mb-5  text-2xl text-purple-900" >Our Story</h2>
          <p className=" max-w-[700px] text-justify">
            SkillUp was founded in 2023 by a team of passionate educators and
            lifelong learners. We believe that education shouldn't be limited by
            traditional barriers like location, time constraints, or cost. With
            SkillUp, you can learn at your own pace, on your own terms, from the
            comfort of your home.
          </p>
          
        </div>
        <div className=" bg-purple-200 p-8 py-16">
          <h2 className=" font-semibold mb-5  text-2xl text-blue-900">Our Mission</h2>
          <p className="  max-w-[700px] text-justify">
            Our mission is to democratize education by providing affordable,
            high-quality online courses taught by industry experts. We strive to
            create an engaging and supportive learning environment that fosters
            curiosity, growth, and personal development.
          </p>
          
        </div>
        <div>
          <h2 className=" text-2xl text-blue-800">What Makes Us Unique?</h2>
          <div className=" mt-8 text-justify  grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4  lg:gap-3  sm:gap-5 justify-between  items-center">
            <div className=" hover:bg-purple-500 hover:text-white shadow-lg  p-3 ">
              <h2 className=" text-center mb-3 text-sky-800 font-semibold text-lg">
                Expert Instructors
              </h2>
              <p >
                We partner with industry-leading professionals to deliver
                engaging and up-to-date courses.
              </p>
            </div>
            <div className="  shadow-lg  p-3 ">
              <h2 className=" text-center mb-3 text-sky-800 font-semibold text-lg">
                Flexible Learning
              </h2>
              <p>
                Learn at your own pace, on your own schedule, with on-demand
                courses and self-paced learning. pen_spark
              </p>
            </div>
            <div className="  shadow-lg  p-3 ">
              <h2 className=" text-center mb-3 text-sky-800 font-semibold text-lg">
                Interactive Content
              </h2>
              <p>
                {" "}
                Our courses combine video lectures, quizzes, interactive
                exercises, and downloadable resources to keep you engaged.
              </p>
            </div>
            <div className="  shadow-lg  p-3 ">
              <h2 className=" text-center mb-3 text-sky-800 font-semibold text-lg">
                Supportive Community
              </h2>
              <p>
                {" "}
                Connect with fellow learners and instructors through our online
                forums and discussion boards.
              </p>
            </div>
          </div>
        </div>
        <div className=" bg-purple-200 p-8 py-16">
          <h2 className=" mb-5  text-2xl text-blue-800">
            Join the SkillUp Community
          </h2>
          <p>
            Ready to embark on your learning journey? Sign up for a free account
            today and explore our vast library of courses!
          </p>
          <div className=" sm:flex  mt-10 justify-between items-center">
            <Link
              className=" bg-blue-500 py-3 px-6 text-white font-semibold rounded-md hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border"
              to={"/courses"}
            >
              <h2>
                Browse Courses <ArrowForward />
              </h2>
            </Link>
            <Link
              className=" bg-blue-500 py-3 px-6 text-white font-semibold rounded-md hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border"
              to={"/sign-up"}
            >
              <h2>
                Sign Up for Free <ArrowForward />
              </h2>
            </Link>
            <Link
              className=" bg-blue-500 py-3 px-6 text-white font-semibold rounded-md hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border"
              to={"/contact-us"}
            >
              <h2>
                Contact Us <ArrowForward />
              </h2>
            </Link>
          </div>
        </div>

        <div className=" text-2xl py-6">
          <h1>We're excited to be part of your learning journey!</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
