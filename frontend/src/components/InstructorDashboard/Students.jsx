import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Checkbox } from "@mui/material";

const Students = () => {
  const [enrollment, setEnrollment] = useState([]);
  const [error, setError] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        const response = await fetch(`/api/enrollment/${courseId}`);
        const data = await response.json();
        setEnrollment(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching enrollment data");
      }
    };

    fetchEnrollment();
  }, [courseId]);

  const handleDeleteEnrollment = async (enrollmentId) => {
    try {
      const response = await axios.delete(
        `/api/enrollment/delete/${enrollmentId}`
      );

      if (response.data.success) {
        setEnrollment(enrollment.filter((e) => e._id !== enrollmentId));
      } else {
        setError("Error deleting enrolled student");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting enrolled student");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 sm:px-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-md shadow-md overflow-x-auto">
            <table className="w-full text-blue-800 border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="p-2 text-left">Student Name</th>
                  <th className="p-2 text-left">Student Email</th>
                  <th className="p-2 text-left">Assignment</th>
                  <th className="p-2 text-left">Grade</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {enrollment.map((data) => (
                  <tr key={data._id} className="hover:bg-gray-200">
                    <td className="p-2">
                      <Checkbox /> {data.username}
                    </td>
                    <td className="p-2">{data.email}</td>
                    <td className="p-2">Assignment</td>
                    <td className="p-2">Grade</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteEnrollment(data._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Students;