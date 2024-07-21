import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User has signed in after resetting password
        try {
          const idToken = await user.getIdToken();
          await axios.post("/api/update-password", { email: user.email }, {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
          setMessage("Password updated in the database successfully.");
        } catch (err) {
          setError("Failed to update password in the database.");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="dark:bg-gray-800 bg-slate-50 h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-sky-900">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 mt-6">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          required
          className="dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
        />
        <button
          type="submit"
          disabled={loading}
          className="sm:w-[450px] font-semibold hover:bg-white hover:text-blue-600 hover:border hover:border-blue-400 p-2 px-6 rounded-lg text-white bg-blue-600"
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>
      {message && <p className="text-green-500 mt-5">{message}</p>}
      {error && <p className="text-red-500 mt-5">{error}</p>}
      <Link to="/sign-in" className="mt-6 text-blue-800 underline">
        Back to Sign In
      </Link>
    </div>
  );
};

export default ForgotPassword;