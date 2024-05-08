import React, { useState } from "react";
import Header from "../Common/Header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";
import { Try } from "@mui/icons-material";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(false);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null)
      navigate('/')
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className=" dark:bg-gray-800">
      <Header />
      <div className=" flex justify-center items-center">
        <div className="  shadow-sm shadow-purple-600 dark:bg-gray-400  p-[5%] rounded-2xl sm:w-[650px] bg-slate-50  border border-slate-300  m-[5%]">
          <h1 className=" m-3  font-serif sm:text-[22px] text-sky-900">
            Hi, Welcome back!
          </h1>
          <form
            onSubmit={handleSubmit}
            action=""
            className="  flex flex-col justify-between items-center gap-6 "
          >
            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
              className=" dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3  focus:outline-none"
            />
           
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className=" dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
            />
            <button
              disabled={loading}
              type="submit"
              className="sm:w-[450px]  font-semibold hover:bg-white hover:text-blue-600 hover:border hover:border-blue-400  p-2 px-6 rounded-lg text-white bg-blue-600"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
          <div className=" flex gap-2 sm:text-[17px] justify-center mt-2">
            <p>Dont have an account?</p>
            <Link to={"/sign-up"}>
              <span className=" text-blue-600 underline">Sign Up</span>
            </Link>
          </div>
          {error && <p className=" text-red-500 mt-5">{error}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
