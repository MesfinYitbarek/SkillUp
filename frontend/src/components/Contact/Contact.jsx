
import React, { useState } from "react";
import image3 from "../../assets/background image/pexels-peter-olexa-2214257-4012966.jpg";
import Header from "../Common/Header";
import Email from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "../Common/Footer";
import { motion } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [open, setOpen] = useState(true);

  const contactData = [
    {
      title: "Postal Address",
      content: "PO Box CMC Michael, Addis Ababa, Ethiopia",
      icon: <LocationOnIcon />,
      delay: 0.1,
    },
    {
      title: "Phone",
      content: "+251-975364420",
      icon: <PhoneIcon />,
      delay: 0.3,
    },
    {
      title: "Email",
      content: "contact@skillup.com",
      icon: <Email />,
      delay: 0.5,
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
    <div className="bg-gradient-to-b from-slate-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 dark:text-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[30vh] md:h-[40vh] flex items-center justify-center text-white"
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
            className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl md:text-2xl text-shadow"
          >
            We're here to help and listen!
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-white mb-4">Get in Touch</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Whether you have questions about our courses, need assistance navigating the platform,
            or simply want to share feedback, we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 lg:px-12">
          {contactData.map((data, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
              className="group dark:bg-sky-900 flex flex-col items-center dark:text-white text-sky-800 gap-4 md:gap-6 pt-6 md:pt-8 shadow-xl rounded-sm hover:text-white hover:scale-105 hover:bg-gradient-to-r from-purple-500 to-blue-500 p-4 md:p-6 text-center h-[200px] md:h-[220px] bg-white"
            >
              <div className="border-2 dark:text-white text-blue-800 group-hover:border-white group-hover:text-white border-blue-800 p-2 h-[45px] w-[45px] rounded-full flex items-center justify-center">
                {data.icon}
              </div>
              <div className="font-semibold">
                <h3 className="font-bold text-lg pb-2">{data.title}</h3>
                <p className="text-sm md:text-base">{data.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="dark:bg-gray-700 flex justify-center rounded-lg p-4 md:p-10"
        >
          <form
            data-aos="fade-up"
            data-aos-once="true"
            onSubmit={handleSubmit}
            className="flex flex-col dark:text-white dark:bg-gray-500 space-y-4 w-full max-w-[650px] bg-white shadow-md p-6 md:p-10 rounded-xl border-slate-400"
          >
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2 border-b dark:bg-gray-500 dark:text-white border-slate-400 focus:border-b-2 focus:border-b-sky-600 focus:outline-none w-full dark:placeholder:text-white focus:placeholder:text-sky-600"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 dark:bg-gray-500 dark:text-white border-slate-400 border-b dark:placeholder:text-white focus:border-b-2 focus:border-b-sky-600 focus:outline-none w-full focus:placeholder:text-sky-600"
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
                className="px-4 py-2 dark:bg-gray-500 dark:text-white border border-slate-400 dark:placeholder:text-white resize-none h-[170px] focus:outline-sky-600 w-full focus:placeholder:text-sky-600"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-800 hover:bg-white hover:text-blue-800 hover:border hover:border-blue-800 font-semibold text-white px-4 py-3 rounded-sm focus:outline-none w-full md:w-[30%] mx-auto"
            >
              Send Message
            </button>
            {formSubmitted && (
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
            )}
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
