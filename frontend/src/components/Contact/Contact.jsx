import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Common/Header";
import Email from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import { Twitter } from "@mui/icons-material";
import Telegram from "@mui/icons-material/Telegram";
import Footer from "../Common/Footer";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      console.log(data.message); // Log success message
      setFormSubmitted(true);
      setName("");
      setEmail("");
      setMessage(""); // Clear form fields after successful submission
    } catch (err) {
      console.error(err);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };


  return (
    <div className=" bg-slate-50 dark:bg-gray-700 dark:text-white">
      <div>
        <Header />
      </div>
      <div className="  bg-gradient-to-br  from-purple-400 sm:p-14 p-3 text-white">
        <h1 className=" sm:text-4xl font-bold ">Connect with Us</h1>
      </div>
      <div className="container mx-auto px-4 py-8 ">
        <div className=" sm:my-7 sm:mb-20">
          <p className=" sm:text-xl p-4 font-serif leading-10 ">
            We're here to help! Whether you have questions about our courses,
            need assistance navigating the platform, or simply want to share
            feedback, we'd love to hear from you.
          </p>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          <div className=" flex items-center gap-2 shadow-sm  text-white bg-gradient-to-r from-purple-500 to-pink-500 p-3 shadow-purple-400">
            <div className=" ">
              <LocationOnIcon className=" text-purple-800  " />
            </div>
            <div>
              <h3>Postal Address</h3>
              <p>PO Box CMC Michael, Addis Ababa, Ethiopia</p>
            </div>
          </div>
          <div className=" flex items-center gap-2 shadow-sm hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 p-3 shadow-purple-400">
            <div>
              <PhoneIcon className=" text-purple-800  " />
            </div>
            <div>
              <h3>Phone</h3>
              <p>+251-975364420</p>
            </div>
          </div>

          <div className=" flex items-center gap-2 shadow-sm text-white bg-gradient-to-r from-purple-500 to-pink-500 p-3 shadow-purple-400">
            <div>
              <Email className=" text-purple-800  " />
            </div>
            <div>
              <h3>Email</h3>
              <p>contact@skillup.com</p>
            </div>
          </div>
        </div>
        <div className=" my-20 sm:my-28 sm:flex gap-28">
          <div className=" flex flex-col gap-5 my-16 ">
            <p className=" text-xl sm:text-3xl text-sky-950">
              Follow us on social media
            </p>
            <div className=" flex flex-col  gap-8 text-purple-950 bg-slate-50 border border-slate-300 p-4 ">
              <Link to={"/"} className="  hover:translate-x-6 hover:scale-110">
                <Facebook className=" text-blue-600 hover:text-purple-400" />
                Facebook
              </Link>
              <hr />
              <Link to={"/"} className=" hover:translate-x-6 hover:scale-110">
                <Telegram className=" text-blue-600 hover:text-purple-400" />
                Telegram
              </Link>
              <hr />
              <Link to={"/"} className=" hover:translate-x-6 hover:scale-110">
                <Instagram className=" text-pink-600 hover:text-purple-400" />
                Instagram
              </Link>
              <hr />
              <Link to={"/"} className=" hover:translate-x-6 hover:scale-110">
                <Twitter className=" text-blue-300 hover:text-purple-400" />
                Twitter
              </Link>
              <hr />
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 sm:w-[650px] sm:h-[470px]  bg-gradient-to-r from-purple-200 to-pink-200  p-2 sm:p-10 rounded-xl border border-purple-400"
          >
            <h2 className="sm:text-3xl  group  font-bold mb-4 sm:mb-8  text-center  py-2 text-sky-900  ">
              <span
                className="  bg-left-bottom bg-gradient-to-r
                    from-purple-600 to-pink-600
                    bg-[length:50%_5px] bg-no-repeat 
                    group-hover:bg-[length:100%_5px] 
                    transition-all duration-500 ease-out"
              >
                Contact us
              </span>
            </h2>

            <div className="flex  flex-col space-y-2 sm:flex-row ">
              <label
                htmlFor="name"
                className="text-gray-700  font-medium sm:w-1/2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2 border border-purple-400 rounded-md focus:outline-sky-600 sm:w-full"
                required
              />
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row ">
              <label
                htmlFor="email"
                className="text-gray-700 font-medium sm:w-1/2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border-purple-400 border rounded-md focus:outline-sky-600 sm:w-full"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-gray-700 font-medium">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)} // Corrected for Tailwind CSS v3 compatibility
                className="px-4 py-2 border border-purple-400 rounded-md resize-none focus:outline-sky-600 w-full"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-sky-700 hover:bg-white hover:text-sky-700 hover:border hover:border-sky-700 font-semibold  text-white px-4 py-2 rounded-md focus:outline-none mx-auto sm:mx-0"
            >
              Submit
            </button>
            {formSubmitted && (
              <p className="text-green-500 font-medium text-center">
                Message submitted successfully!
              </p>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
