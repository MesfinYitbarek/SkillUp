import React, { useState } from "react";

const CreateAssignment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
      const response = await fetch('http://localhost:4444/api/assignments', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Assignment created successfully:', result.assignment);
        setTitle("");
        setDescription("");
        setFile(null);
      } else {
        console.error('Error creating assignment:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Create Assignment</h2>
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
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;