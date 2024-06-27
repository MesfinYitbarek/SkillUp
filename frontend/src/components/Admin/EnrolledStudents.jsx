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
    <div className=" pt-10 pl-28  flex justify-center items-center">
      <div className=" bg-white rounded-md mt-12 px-5 py-4">
        <table className="  text-sky-900   border-separate border-spacing-y-2 min-w-[600px]">
          <tr className=" ">
            <td className=" text-blue-800 font-bold text-xl ">Enrolled Students</td>
            <td></td>
          </tr>
          <tr className=" bg-blue-800   font-semibold text-white ">
            <td className="p-2">UserName</td>
            <td>User Email</td>
           
            <td>Course Name</td>
            
          </tr>
          {enrollment.map((data) => (
            <tr className=" hover:bg-gray-200 ">
              <td className=" p-1">{data.username}</td>
              <td>{data.email}</td>
              
              <td>{data.courseName}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default EnrolledStudents;
