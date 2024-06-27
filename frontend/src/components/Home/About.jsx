import React from "react";
import image3 from "../../assets/background image/pexels-august-de-richelieu-4260485.jpg";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
const About = () => {
  return (
    <div>
      <div className="dark:bg-gray-800 bg-gray-50 rounded-xl m-10 dark:text-white h-screen px-14 sm:px-20 flex gap-24  justify-between items-center  ">
        <img
          data-aos="zoom-in"
          data-aos-delay="50"
          data-aos-once="true"
          className=" mt-10 md:flex  hidden max-w-[500px]"
          src={image3}
          alt=" image"
        />
        <div
          data-aos="zoom-in"
          data-aos-delay="200"
          data-aos-once="true"
          className="  pt-10"
        >
          <h5 className="  mb-5 font-semibold text-5xl ">
            {" "}
            Take the next step toward your personal and professional goals with
            SkillUp.
          </h5>
          <p>Empowering Lifelong Learners.</p>
          <Link to={"/sign-in"}>
            <button className=" p-3 px-5 bg-blue-800 text-xl my-7 rounded-lg hover:bg-transparent hover:border-2 text-white hover:text-blue-800 hover:border-blue-800 ">
              Join For Free <ArrowForward />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
