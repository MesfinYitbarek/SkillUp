import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Common/Header";
import Email from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "../Common/Footer";
import image3 from "../../assets/background image/pexels-peter-olexa-2214257-4012966.jpg";
import img from "../../assets/background image/pexels-buro-millennial-636760-1438081.jpg";
import { motion } from "framer-motion";

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
      delay: "100",
    },
    {
      title: "Phone",
      content: "+251-975364420",
      icon: <PhoneIcon />,
      delay: "300",
    },
    {
      title: "Email",
      content: "contact@skillup.com",
      icon: <Email />,
      delay: "500",
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
  const [open, setOpen] = React.useState(true);
  return (
    <div className="bg-slate-50 dark:bg-gray-700 dark:text-white">
      <div className="sm:h-screen">
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
            className="brightness-50 h-screen text-white"
          ></div>
          <div className="flex justify-between absolute top-44 items-center">
            <div className="p-4"></div>
            <div className="sm:my-20 sm:mx-20">
              <p
                data-aos="zoom-in"
                className="dark:text-white text-center sm:text-2xl p-4 font-serif   text-white"
              >
                <h1 className="text-5xl pb-6 text-white">
                  We're here to help!
                </h1>{" "}
                Whether you have questions about our courses, need assistance
                navigating the platform, or simply want to share feedback, we'd
                love to hear from you.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-36 mx-auto  ">
        <div className="px-20 py-16  bg-white   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center ">
          {contactData.map((data) => (
            <motion.div
              whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-col items-center text-sky-800 gap-6 pt-8 shadow-xl rounded-sm  hover:text-white hover:scale-110 hover:bg-gradient-to-r from-purple-500 to-blue-500 p-3 text-center h-[220px] w-[300px]   bg-white"
            >
              <div className="border-2 text-purple-800 group-hover:border-white  group-hover:text-white  border-purple-800 p-2 h-[45px] w-[45px] rounded-full ">
                <div className="">{data.icon}</div>
              </div>
              <div className="  font-semibold">
                <h3 className=" font-bold text-lg pb-2">{data.title}</h3>
                <p>{data.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className=" px-20 py-16 h-screen items-center justify-center my-20 sm:my-28 sm:flex gap-28">
          <div className=" flex items-center">
            <form
              data-aos="fade-up"
              data-aos-once="true"
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4 sm:w-[650px]   bg-white shadow-xl  p-2 sm:p-20 rounded-xl  border-slate-400"
            >
              <div className="flex  flex-col space-y-2 sm:flex-row ">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-2 border-b border-slate-400 focus:border-b-2 focus:border-b-sky-600  focus:outline-none sm:w-full focus:placeholder:text-sky-600"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row ">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2  border-slate-400 border-b focus:border-b-2 focus:border-b-sky-600 focus:outline-none sm:w-full focus:placeholder:text-sky-600"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="px-4 py-2  border border-slate-400  resize-none h-[170px] focus:outline-sky-600 w-full focus:placeholder:text-sky-600"
                  placeholder="Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-sky-700 hover:bg-white hover:text-sky-700 hover:border hover:border-sky-700 font-semibold  text-white px-4 py-3 rounded-sm focus:outline-none w-[30%] mx-auto sm:mx-0"
              >
                Send Message
              </button>
              {formSubmitted && (
                <p className="text-green-500 font-medium text-center">
                  <Box sx={{ width: "100%" }}>
                    <Collapse in={open}>
                      <Alert
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 2 }}
                      >
                        Message submitted successfully!
                      </Alert>
                    </Collapse>
                  </Box>
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
