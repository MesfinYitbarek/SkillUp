// src/components/CreateAssignment.js
import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
      navigate("/instructor"); // Redirect after successful creation
    } catch (error) {
      console.error(error);
      alert("Error creating assignment");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Assignment Title
          </label>
          <input
            id="title"
            type="text"
            value={assignmentTitle}
            onChange={(e) => setAssignmentTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
             <label className="block text-gray-700 font-bold mb-2" htmlFor="dueDate">
               Due Date
             </label>
             <input
               id="dueDate"
               type="date"
               value={dueDate}
               onChange={(e) => setDueDate(e.target.value)}
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               required
             />
           </div>
           <button
             type="submit"
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           >
             Create Assignment
           </button>
         </form>
       </div>
     );
   };

   export default CreateAssignment;