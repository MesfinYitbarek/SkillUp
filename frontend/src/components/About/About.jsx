import React from "react";
import Header from "../Common/Header";
import { Link } from "react-router-dom";
import ArrowForward from "@mui/icons-material/ArrowForward";
const About = () => {
  return (
    <div>
      <Header />
      <div className="px-20 py-10 flex flex-col gap-20">
        <div className=" flex-col flex ">
          <h2>Welcome to SkillUp! </h2>
          <h5> Empowering Lifelong Learners</h5>
          <p>
            {" "}
            We're an online learning platform dedicated to making high-quality
            education accessible to everyone, everywhere. Whether you're a
            seasoned professional looking to upskill or a complete beginner
            eager to explore new horizons, SkillUp provides the tools and
            resources you need to achieve your learning goals. pen_spark
          </p>
        </div>
        <div>
          <h2>Our Story</h2>
          <p>
            SkillUp was founded in 2023 by a team of passionate educators and
            lifelong learners. We believe that education shouldn't be limited by
            traditional barriers like location, time constraints, or cost. With
            SkillUp, you can learn at your own pace, on your own terms, from the
            comfort of your home.
          </p>
        </div>
        <div>
          <h2>Our Mission</h2>
          <p>
            Our mission is to democratize education by providing affordable,
            high-quality online courses taught by industry experts. We strive to
            create an engaging and supportive learning environment that fosters
            curiosity, growth, and personal development.
          </p>
        </div>
        <div>
          <h2 className=" text-2xl text-purple-900">What Makes Us Unique?</h2>
          <div className=" mt-8  grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4  lg:gap-3  sm:gap-5 justify-between  items-center">
            <div className="  shadow-lg  p-3 ">
              <h2 className=" text-center mb-3 text-sky-800 font-semibold text-lg">
                Expert Instructors
              </h2>
              <p>
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
        <div>
          <h2 className=" mb-3 text-2xl text-purple-900">
            Join the SkillUp Community
          </h2>
          <p>
            Ready to embark on your learning journey? Sign up for a free account
            today and explore our vast library of courses!
          </p>
          <div className=" sm:flex  justify-between items-center">
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

        <div>
          <h1>We're excited to be part of your learning journey!</h1>
        </div>
      </div>
    </div>
  );
};

export default About;
