import { ArrowRight, Delete, Edit } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import AdminContainer from "../../Containers/AdminContainer";
import axios from "axios";
import { Link } from "react-router-dom";
import AddUsers from "./AddUsers";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("students");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/users");
        const data = await response.json();
        const filteredStudent = data.filter((user) => user.role === 'student');
        const filteredInstructor = data.filter((user) => user.role === 'instructor');
        const filteredAdmin = data.filter((user) => user.role === 'admin');
        setStudent(filteredStudent);
        setInstructor(filteredInstructor);
        setAdmin(filteredAdmin);
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`/api/user/deleteAdmin/${userId}`);

      if (response.data.success) {
        setUsers(users.filter((user) => user._id !== userId));
        setStudent(student.filter((user) => user._id !== userId));
        setInstructor(instructor.filter((user) => user._id !== userId));
        setAdmin(admin.filter((user) => user._id !== userId));
      } else {
        setError("Error deleting User");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting User");
    }
  };

  const renderUserTable = (title, data) => (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Role</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div className="flex items-center">
                  <img className="w-10 h-10 rounded-full mr-4" src={user.avatar} alt={`${user.username}'s avatar`} />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-white">{user.username}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">
                <button onClick={() => handleDeleteUser(user._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mr-3">
                  <Delete />
                </button>
                <Link to={`/update-user/${user._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  <Edit />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab("students")}
            className={`px-4 py-2 rounded-md ${activeTab === "students" ? "bg-blue-800 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab("instructors")}
            className={`px-4 py-2 rounded-md ${activeTab === "instructors" ? "bg-blue-800 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Instructors
          </button>
          <button
            onClick={() => setActiveTab("admins")}
            className={`px-4 py-2 rounded-md ${activeTab === "admins" ? "bg-blue-800 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Admins
          </button>
        </div>
        <button onClick={openModal} className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
          Add User <ArrowRight />
        </button>
      </div>

      {activeTab === "students" && renderUserTable("Students", student)}
      {activeTab === "instructors" && renderUserTable("Instructors", instructor)}
      {activeTab === "admins" && renderUserTable("Admins", admin)}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add User</h2>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <AddUsers />
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Users;