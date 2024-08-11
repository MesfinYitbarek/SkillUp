import React, { useState, useEffect } from "react";
import axios from "axios";
import { Delete } from "@mui/icons-material";

const ContactDisplay = () => {
  const [contact, setContact] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch("/api/contact/contactDisplay");
        const data = await response.json();
        setContact(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching messages");
      }
    };

    fetchContact();
  }, []);

  const handleDeleteContact = async (contactId) => {
    try {
      const response = await axios.delete(`/api/contact/delete/${contactId}`);

      if (response.data.success) {
        setContact(contact.filter((c) => c._id !== contactId));
      } else {
        setError("Error deleting Contact message");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting Contact message");
    }
  };

  return (
    <div className="flex justify-center items-center pt-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md w-full max-w-6xl mt-12 p-6">
        <h2 className="text-blue-800 font-bold text-2xl mb-6">Messages</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contact.map((data) => (
                <tr key={data._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.email}</td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs truncate">{data.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDeleteContact(data._id)} className="text-red-600 hover:text-red-900">
                      <Delete fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactDisplay;