import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="fixed top-6 bottom-6 right-20 h-screen w-3 bg-gray-200 rounded-l-full">
      <div
        className="bg-purple-600 rounded-full"
        style={{ height: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;