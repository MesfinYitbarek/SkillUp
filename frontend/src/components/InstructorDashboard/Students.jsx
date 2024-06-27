import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { CheckBox } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
const Students = () => {
  const [enrollment, setEnrollment] = useState([]);
  const [error, setError] = useState(null);
  const { courseId } = useParams();
  console.log(enrollment);
  React.useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`/api/enrollment/${courseId}`);
        const data = await response.json();
        setEnrollment(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContact();
  }, [enrollment]);

  const handleDeleteEnrollment = async (enrollmentId) => {
    try {
      const response = await axios.delete(
        `/api/enrollment/delete/${enrollmentId}`
      );

      if (response.data.success) {
        setEnrollment([
          ...enrollment.filter((enrollment) => enrollment._id !== enrollmentId),
        ]);
      } else {
        setError("Error deleting enrolled student message");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting enrolled student message");
    }
  };

  return (
    <div>
      <div>
        <Header/>
        <div>
          <div className="  flex justify-center items-center">
            <div className=" bg-white rounded-md my-12 px-10 py-4">
              <table className="  text-blue-800   border-separate border-spacing-y-2 min-w-[600px]">
                <tr className=" ">
                  
                  <td></td>
                </tr>
                <tr className=" bg-blue-800   font-semibold text-white ">
                  <td className="p-2">Student Name</td>
                  <td className=" px-10">Student Email</td>
                  <td className=" px-10">Course Name</td>
                  <td></td>
                </tr>
                {enrollment.map((data) => (
                  <tr className=" hover:bg-gray-200 ">
                    <td className=" p-1"><Checkbox/> {data.username}</td>
                    <td className=" px-10">{data.email}</td>
                    <td className=" px-10">{data.courseName}</td>
                    <td className="    text-red-600    text-center">
                      <button
                        onClick={() => handleDeleteEnrollment(data._id)}
                        className=" px-10"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Students;
