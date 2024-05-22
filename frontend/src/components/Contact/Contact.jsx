import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Common/Header";
import Email from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import { DoubleArrow, Twitter } from "@mui/icons-material";
import Telegram from "@mui/icons-material/Telegram";
import Footer from "../Common/Footer";
import image3 from "../../assets/background image/pexels-peter-olexa-2214257-4012966.jpg";
import img from "../../assets/background image/pexels-buro-millennial-636760-1438081.jpg";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const contactData = [
    {
      title: "Postal Address",
      content: " PO Box CMC Michael, Addis Ababa, Ethiopia",
      icon: <LocationOnIcon />,
      delay:"100",
    },
    {
      title: "Phone",
      content: "+251-975364420",
      icon: <PhoneIcon />,
      delay:"300",
    },
    {
      title: "Email",
      content: "contact@skillup.com",
      icon: <Email />,
      delay:"500",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      console.log(data.message); 
      setFormSubmitted(true);
      setName("");
      setEmail("");
      setMessage(""); 
    } catch (err) {
      console.log(err);
    
    }
  };

  return (
    <div className="  bg-slate-50 dark:bg-gray-700 dark:text-white">
      <div className=" sm:h-screen">
        <div>
          <Header />
        </div>
        <div>
          <div
            style={{
              backgroundImage: `url(${image3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "screen",
              width: "100%",
              opacity: "100%", 
            }}
            className="  brightness-50 h-[10px]  text-white"
          ></div>
           <div className=" flex justify-between items-center">
            <div className=" p-4 ">
           
            </div>
            <div className=" sm:my-20 sm:mx-20 ">
            <p data-aos="fade-right" className=" dark:text-white text-center sm:text-2xl p-4 font-serif   text-blue-900 ">
              <h1 className="text-5xl pb-6 text-blue-600">We're here to help!</h1>  Whether you have questions about our courses,
              need assistance navigating the platform, or simply want to share
              feedback, we'd love to hear from you.
            </p>
          </div>
           </div>
         
        </div>
      </div>

      <div  className="container mx-auto  ">
        <div style={{ backgroundImage: `url(${image3})`, backgroundSize: "cover",
              backgroundPosition: "center", }} className=" px-20 py-16  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center ">
          {contactData.map((data) => (
            <div>
              <div
               
                className="  group flex flex-col items-center text-sky-800 gap-6 pt-8 shadow-xl rounded-sm  hover:text-white hover:scale-110 hover:bg-gradient-to-r from-purple-500 to-blue-500 p-3 text-center h-[220px] w-[300px]   bg-white"
              >
                <div className="border-2 text-purple-800 group-hover:border-white  group-hover:text-white  border-purple-800 p-2 h-[45px] w-[45px] rounded-full ">
                  <div className="    ">{data.icon}</div>
                </div>
                <div className="  font-semibold">
                  <h3 className=" font-bold text-lg pb-2">{data.title}</h3>
                  <p>{data.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" px-20 py-16 h-screen items-center my-20 sm:my-28 sm:flex gap-28">
          <div data-aos="fade-right"  data-aos-once="true" className=" flex flex-col gap-5 my-16 ">
            <p className=" text-xl sm:text-3xl text-sky-950">
              Follow us on social media
            </p>
            <div className=" flex flex-col  gap-4 text-purple-950 bg-slate-50 border border-slate-300 p-4 ">
              <Link
                to={"/"}
                className=" bg-purple-200 p-2 rounded-lg hover:translate-x-6 hover:scale-110"
              >
                <Facebook className="  text-blue-600 hover:text-purple-400" />
                Facebook
              </Link>
              <hr />
              <Link
                to={"/"}
                className=" bg-blue-200 p-2 rounded-lg hover:translate-x-6 hover:scale-110"
              >
                <Telegram className=" text-blue-600 hover:text-purple-400" />
                Telegram
              </Link>
              <hr />
              <Link
                to={"/"}
                className=" bg-pink-200 p-2 rounded-lg hover:translate-x-6 hover:scale-110"
              >
                <Instagram className=" text-pink-600 hover:text-purple-400" />
                Instagram
              </Link>
              <hr />
              <Link
                to={"/"}
                className=" bg-sky-200 p-2 rounded-lg hover:translate-x-6 hover:scale-110"
              >
                <Twitter className=" text-blue-300 hover:text-purple-400" />
                Twitter
              </Link>
              <hr />
            </div>
          </div>
          <div className="">
            <h2 className="sm:text-4xl   group   mb-4 sm:mb-8  text-center  py-2 text-sky-900  ">
              <span
                className="  bg-left-bottom bg-gradient-to-r
                    from-purple-600 to-pink-600
                    bg-[length:0%_2px] bg-no-repeat 
                    group-hover:bg-[length:100%_2px] 
                    transition-all duration-500 ease-out"
              >
                Send Us a Message
              </span>
            </h2>
            <form
              data-aos="fade-left"  data-aos-once="true"
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4 sm:w-[650px]   bg-white shadow-xl p-2 sm:p-20 rounded-xl  border-slate-400"
            >
              <div className="flex  flex-col space-y-2 sm:flex-row ">
                <label
                  htmlFor="name"
                  className="text-gray-700  font-medium sm:w-1/5"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-2 border border-slate-400 rounded-md bg-slate-50 focus:outline-sky-600 sm:w-full"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row ">
                <label
                  htmlFor="email"
                  className="text-gray-700 font-medium sm:w-1/5"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 bg-slate-50 border-slate-400 border rounded-md focus:outline-sky-600 sm:w-full"
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
                  className="px-4 py-2 bg-slate-50 border border-slate-400 rounded-md resize-none focus:outline-sky-600 w-full"
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
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
