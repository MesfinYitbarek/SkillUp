import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const VerifyEmail = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          setEmailVerified(true);
          const userTempData = JSON.parse(localStorage.getItem("userTempData"));

          if (userTempData) {
            // Save user to your database
            const response = await fetch("/api/auth/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: userTempData.username,
                email: userTempData.email,
                password: userTempData.password,
                uid: user.uid
              }),
            });

            if (!response.ok) {
              console.error("Failed to save user to the database");
            }

            // Clear local storage
            localStorage.removeItem("userTempData");
          }

          navigate("/");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Verify your email address</h1>
      <p className="text-center">
        A verification email has been sent to your email address. Please check your inbox and follow the instructions to verify your email.
      </p>
      {emailVerified && <p className="text-green-500 mt-4">Email verified! Redirecting...</p>}
    </div>
  );
};

export default VerifyEmail;