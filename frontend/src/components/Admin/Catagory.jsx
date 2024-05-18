import { ArrowDownward, ArrowRight } from "@mui/icons-material";
import React from "react";

const Catagory = () => {
  const [catagory, setCatagory] = React.useState([]);

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
  }, []);
  return (
    <div className="  flex justify-center items-center ">
      <div className=" bg-white rounded-md mt-12 px-10 py-4">
        <table className="  text-sky-900   border-separate border-spacing-y-2 w-[600px]">
          <tr className=" ">
            <td className=" text-blue-700 font-bold text-xl ">Catagories</td>
            <td></td>
            <td className=" text-center">
              <button className=" border  text-purple-600 hover:bg-purple-500 hover:text-white border-purple-600 px-4 py-1 mr-1 font-semibold">
                Add <ArrowRight />
              </button>
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
                <button>Delete</button>
              </td>
              <td className=" text-center text-purple-600 ">
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Catagory;
