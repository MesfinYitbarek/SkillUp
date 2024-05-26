import React, { useState, useEffect } from "react";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const fetchAssignments = async () => {
    try {
      const response = await fetch('http://localhost:4444/api/assignments');
      const result = await response.json();
      if (response.ok) {
        setAssignments(result);
      } else {
        console.error('Error fetching assignments:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const deleteAssignment = async (id) => {
    try {
      const response = await fetch(`http://localhost:4444/api/assignments/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAssignments(assignments.filter((assignment) => assignment._id !== id));
      } else {
        console.error('Error deleting assignment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const startEditing = (assignment) => {
    setEditingAssignment(assignment);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Assignments</h2>
      {assignments.map((assignment) => (
        <div key={assignment._id} className="border p-4 rounded shadow-sm">
          <h3 className="text-lg font-bold">{assignment.title}</h3>
          <p>{assignment.description}</p>
          {assignment.filePath && (
           <a href={`http://localhost:4444/uploads/${assignment.filePath}`} target="_blank" rel="noopener noreferrer">
           Download File
         </a>
         
          )}
          <div className="flex space-x-2 mt-2">
            <button onClick={() => startEditing(assignment)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
              Edit
            </button>
            <button onClick={() => deleteAssignment(assignment._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              Delete
            </button>
          </div>
        </div>
      ))}
      {editingAssignment && (
        <EditAssignment assignment={editingAssignment} onClose={() => setEditingAssignment(null)} />
      )}
    </div>
  );
};

const EditAssignment = ({ assignment, onClose }) => {
  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "file") {
      setFile(files[0]); // Assuming single file upload
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch(`http://localhost:4444/api/assignments/${assignment._id}`, {
        method: 'PUT',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Assignment updated successfully:', result.assignment);
        onClose();
      } else {
        console.error('Error updating assignment:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Edit Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="title" className="text-sm font-medium mb-2">
            Assignment Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            className="shadow-sm rounded px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="text-sm font-medium mb-2">
            Assignment Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            className="shadow-sm rounded px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
            rows={5}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="file" className="text-sm font-medium mb-2">
            Upload File (Optional)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            className="shadow-sm rounded px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {file && <p className="text-sm text-gray-500">Selected: {file.name}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          disabled={!title || !description}
        >
          Update Assignment
        </button>
      </form>
      <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Cancel
      </button>
    </div>
  );
};

export default Assignments;
