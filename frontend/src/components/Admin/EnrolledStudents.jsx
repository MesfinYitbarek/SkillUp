import React from "react";
import { useState } from "react";

const EnrolledStudents = () => {
  const [enrollment, setEnrollment] = useState([]);

  React.useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch("/api/enrollment/enrollmentDisplay");
        const data = await response.json();
        setEnrollment(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContact();
  }, [enrollment]);
  return (
    <div className="  flex justify-center items-center">
      <div className=" bg-white rounded-md mt-12 px-10 py-4">
        <table className="  text-sky-900   border-separate border-spacing-y-2 min-w-[600px]">
          <tr className=" ">
            <td className=" text-blue-700 font-bold text-xl ">Enrolled Students</td>
            <td></td>
          </tr>
          <tr className=" bg-blue-400   font-semibold text-white ">
            <td className="p-2">UserName</td>
            <td>Course Name</td>
          </tr>
          {enrollment.map((data) => (
            <tr className=" even:bg-slate-100 ">
              <td className=" p-1">{data.username}</td>
              <td>{data.course}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default EnrolledStudents;
