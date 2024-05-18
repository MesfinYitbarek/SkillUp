import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateCatagory = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(formData);
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/courses/createCatagory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/courses");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="  flex flex-col justify-between items-center gap-6 "
      >
        <input
          type="text"
          placeholder="Name"
          id="name"
          onChange={handleChange}
          className=" dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
        />
        <input
          type="text"
          placeholder="Label Name"
          id="labelName"
          onChange={handleChange}
          className=" dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
        />
        <button
          disabled={loading}
          type="submit"
          className="sm:w-[450px]  font-semibold hover:bg-white hover:text-blue-600 hover:border hover:border-blue-400  p-2 px-6 rounded-lg text-white bg-blue-600"
        >
          {loading ? "Loading..." : "Create"}
        </button>
      </form>

      {error && <p className=" text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default CreateCatagory;
