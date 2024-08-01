import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaClipboardList, FaCalendarAlt } from "react-icons/fa";
import Header from "../../../../Common/Header";
import Footer from "../../../../Common/Footer";

const CreateAssignment = () => {
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/assignment/create", {
        lessonId,
        assignmentTitle,
        description,
        dueDate,
      });
      alert("Assignment created successfully!");
      navigate("/instructor");
    } catch (error) {
      console.error(error);
      alert("Error creating assignment");
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Create New Assignment</h1>
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                <FaClipboardList className="inline-block mr-2" />
                Assignment Title
              </label>
              <input
                id="title"
                type="text"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                <FaClipboardList className="inline-block mr-2" />
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="dueDate">
                <FaCalendarAlt className="inline-block mr-2" />
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 font-bold"
              >
                Create Assignment
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateAssignment;