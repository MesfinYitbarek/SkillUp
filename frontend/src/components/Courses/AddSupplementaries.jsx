import React, { useState } from "react";

const AddSupplementaries = ({ onAddSupplementary }) => {
  const [type, setType] = useState(""); // "video" or "document"
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "type") {
      setType(value);
    } else if (name === "url") {
      setUrl(value);
    } else if (name === "file") {
      setFile(files[0]); // Assuming single file upload
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!type || (!url && !file)) {
      // Handle validation error: type and either URL or file required
      console.error("Please select a type and provide either a URL or upload a file.");
      return;
    }

    const supplementary = {
      type,
      url: url || "", // Use empty string if file is uploaded
      file, // File object
    };

    onAddSupplementary(supplementary); // Call parent function to add supplementary

    setType("");
    setUrl("");
    setFile(null);
  };

  return (
    <div className="mb-4">
      <h3 className="text-base font-medium mb-2">Add Supplementary Materials</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label htmlFor="type" className="text-sm font-medium">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={handleChange}
            className="shadow-sm rounded px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Type</option>
            <option value="video">Video</option>
            <option value="document">Document (PDF)</option>
          </select>
        </div>
        {type === "video" && (
          <div className="flex flex-col space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              Video URL (e.g., YouTube link)
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={url}
              onChange={handleChange}
              className="shadow-sm rounded px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
        {type === "document" && (
          <div className="flex flex-col space-y-2">
            <label htmlFor="file" className="text-sm font-medium">
              Upload Document (PDF)
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept="application/pdf" // Only accept PDF files
              onChange={handleChange}
              className="shadow-sm rounded px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          disabled={!type || (!url && !file)}
        >
          Add Supplementary
        </button>
      </form>
    </div>
  );
};

export default AddSupplementaries;
