import React from "react";
import axios from "axios";
import { useState } from "react";

const ContactDisplay = () => {
  const [contact, setContact] = React.useState([]);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch("/api/contact/contactDisplay");
        const data = await response.json();
        setContact(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContact();
  }, [contact]);

  const handleDeleteContact = async (contactId) => {
    try {
      const response = await axios.delete(`/api/contact/delete/${contactId}`);

      if (response.data.success) {
        setContact([...contact.filter((contact) => contact._id !== contactId)]);
      } else {
        setError("Error deleting Contact message");
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting Contact message");
    }
  };

  return (
    <div className="  pt-10 flex justify-center items-center">
      <div className=" bg-white rounded-md mt-12 px-10 py-4">
        <table className="  text-blue-800   border-separate border-spacing-y-2 min-w-[600px]">
          <tr className=" ">
            <td className=" text-blue-800 font-bold text-xl ">Messsages</td>
            <td></td>
            <td ></td>
            <td></td>
          </tr>
          <tr className=" bg-blue-800   font-semibold text-white ">
            <td className="p-2">Name</td>
            <td>Email</td>
            <td>Message</td>
            <td></td>
          </tr>
          {contact.map((data) => (
            <tr className=" hover:bg-gray-200 ">
              <td className=" p-1">{data.name}</td>
              <td>{data.email}</td>
              <td>{data.message}</td>
              <td className="    text-red-600    text-center">
                <button onClick={() => handleDeleteContact(data._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ContactDisplay;
