import { ArrowBack } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
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
      navigate("/admin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className=" flex justify-center bg-slate-100 items-center h-screen">
      <form
        onSubmit={handleSubmit}
        action=""
        className=" rounded-md border-l-8 border-l-blue-800 bg-white  p-24  flex flex-col justify-between items-center gap-6 "
      >
        <Link to={"/admin"}>
        <ArrowBack/>
        </Link>
        
        <input
          type="text"
          placeholder="Catagory Name"
          id="name"
          onChange={handleChange}
          className=" dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
        />
        <input
          type="text"
          placeholder="Catgory Name "
          id="labelName"
          onChange={handleChange}
          className=" dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
        />
        <button
          disabled={loading}
          type="submit"
          className="sm:w-[450px]  font-semibold hover:bg-white hover:text-blue-800 hover:border hover:border-blue-800  p-2 px-6 rounded-lg text-white bg-blue-800"
        >
          {loading ? "Loading..." : "Create Catagory"}
        </button>
      </form>

      {error && <p className=" text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default CreateCatagory;
