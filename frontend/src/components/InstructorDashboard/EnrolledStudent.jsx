import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const EnrolledStudent = () => {
  const [enrollment, setEnrollment] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  console.log(enrollment);
  React.useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(
          `/api/enrollment/enrolledStudents/${currentUser._id}`
        );
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
      const response = await axios.delete(`/api/enrollment/delete/${enrollmentId}`);

      if (response.data.success) {
        setEnrollment([...enrollment.filter((enrollment) => enrollment._id !== enrollmentId)]);
      } else {
        setError("Error deleting enrolled student message");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting enrolled student message");
    }
  };

  return (
    <div className="  flex justify-center items-center">
      <div className=" bg-white rounded-md mt-12 px-10 py-4">
        <table className="  text-sky-900   border-separate border-spacing-y-2 min-w-[600px]">
          <tr className=" ">
            <td className=" text-blue-700 font-bold text-xl ">
              Enrolled Students
            </td>
            <td></td>
          </tr>
          <tr className=" bg-blue-400   font-semibold text-white ">
            <td className="p-2">UserName</td>
            <td>User Email</td>
            <td>Course Name</td>
            <td></td>
          </tr>
          {enrollment.map((data) => (
            <tr className=" even:bg-slate-100 ">
              <td className=" p-1">{data.username}</td>
              <td>{data.email}</td>
              <td>{data.courseName}</td>
              <td className="    text-red-600    text-center">
                <button onClick={() => handleDeleteEnrollment(data._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default EnrolledStudent;
