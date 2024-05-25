import { ArrowDownward, ArrowRight } from "@mui/icons-material";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const Catagory = () => {
  const [catagory, setCatagory] = React.useState([]);
  const [error, setError] = useState(null);
  React.useEffect(() => {
    const fetchCatagory = async () => {
      try {
        const response = await fetch("/api/courses/catagory");
        const data = await response.json();
        setCatagory(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCatagory();
  }, [catagory]);

  const handleDeleteCatagory = async (catagoryId) => {
    try {
      const response = await axios.delete(
        `/api/courses/deletecatagory/${catagoryId}`
      );

      if (response.data.success) {
        setCatagory([
          ...catagory.filter((catagory) => catagory._id !== catagoryId),
        ]);
      } else {
        setError("Error deleting Contact message");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting Contact message");
    }
  };

  return (
    <div className="  flex justify-center items-center pt-12 ">
      <div className=" bg-white rounded-md mt-12 px-10 py-4">
        <table className="  text-sky-900   border-separate border-spacing-y-2 w-[600px]">
          <tr className=" ">
            <td className=" text-blue-700 font-bold text-xl ">Catagories</td>
            <td></td>
            <td className=" text-center">
              <Link to="/create-catagory" className=" border  text-purple-600 hover:bg-purple-500 hover:text-white border-purple-600 px-4 py-1 mr-1 font-semibold">
                Add <ArrowRight />
              </Link>
            </td>
          </tr>
          <tr className=" bg-blue-400   font-semibold text-white ">
            <td className="p-2">Name</td>
            <td></td>
            <td></td>
          </tr>
          {catagory.map((data) => (
            <tr className=" even:bg-slate-100 ">
              <td className=" p-1">{data.name}</td>
              <td className="    text-red-600    text-center">
                <button onClick={() => handleDeleteCatagory(data._id)}>
                  Delete
                </button>
              </td>
              <td className=" text-center text-purple-600 ">
              <Link to={`/update-catagory/${data._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Catagory;
