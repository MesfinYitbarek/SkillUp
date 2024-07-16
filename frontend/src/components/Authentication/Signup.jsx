import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import GAuth from "./GAuth";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Register user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Send email verification
      await sendEmailVerification(userCredential.user);

      // Store user data in local storage for later use after verification
      localStorage.setItem("userTempData", JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }));

      setLoading(false);
      navigate("/verify-email");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="dark:bg-gray-800 bg-slate-50">
      <Header />
      <div className="hidden lg:flex h-screen px-20 py-7">
        {/* Additional content can go here */}
      </div>
      <div className="lg:absolute top-32 left-72 flex justify-center items-center">
        <div className="dark:bg-gray-400 p-[5%] rounded-2xl sm:w-[650px] bg-slate-50 border border-slate-300 m-[5%]">
          <h1 className="m-3 font-serif sm:text-[22px] text-sky-900">Hi, Welcome back!</h1>
          <form onSubmit={handleSubmit} className="flex flex-col justify-between items-center gap-6">
            <input
              type="text"
              placeholder="Username"
              id="username"
              required
              onChange={handleChange}
              className="dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              required
              onChange={handleChange}
              className="dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              required
              onChange={handleChange}
              className="dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
            />
            <button
              disabled={loading}
              type="submit"
              className="sm:w-[450px] font-semibold hover:bg-white hover:text-blue-600 hover:border hover:border-blue-400 p-2 px-6 rounded-lg text-white bg-blue-600"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <GAuth />
          </form>
          <div className="flex gap-2 sm:text-[17px] justify-center mt-2">
            <p>Already have an account?</p>
            <Link to={"/sign-in"}>
              <span className="text-blue-800 underline">Sign In</span>
            </Link>
          </div>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;