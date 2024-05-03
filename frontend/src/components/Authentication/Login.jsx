import React from "react";
import Header from "../Common/Header";
import { Link } from "react-router-dom";
import Footer from "../Common/Footer";
const Login = () => {
  return (
    <div className=" dark:bg-gray-800 ">
      <Header />
      <div className=" flex justify-center items-center">
        <div className=" shadow-sm shadow-purple-600 dark:bg-gray-400  p-[5%] rounded-2xl sm:w-[650px] bg-slate-50  border border-slate-300  m-[5%]">
          <h1 className=" m-3 -mt-5 font-serif sm:text-[22px] text-sky-900">
            Hi, Welcome back!
          </h1>
          <form
            action=""
            className="  flex flex-col justify-between items-center gap-6 "
          >
            <input
              type="text"
              placeholder="Username"
              id="username"
              className=" dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3  focus:outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              id="password"
              className=" dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
            />
            <button className="sm:w-[450px]  font-semibold hover:bg-white hover:text-blue-600 hover:border hover:border-blue-400  p-2 px-6 rounded-lg text-white bg-blue-600">
              Sign In
            </button>
          </form>
          <div className=" flex gap-2 sm:text-[17px] justify-center mt-2">
            <p>Don't have an account?</p>
            <Link to={"/sign-up"}>
              <span className=" text-blue-600 underline">Register now</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
