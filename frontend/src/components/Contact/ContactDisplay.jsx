import React from "react";

const ContactDisplay = () => {
  const [contact, setContact] = React.useState([]);

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
  }, []);

  return (
    <div className="  flex justify-center items-center">
      <div className=" bg-white rounded-md mt-12 px-10 py-4">
        <table className="  text-sky-900   border-separate border-spacing-y-2 min-w-[600px]">
          <tr className=" ">
            <td className=" text-blue-700 font-bold text-xl ">Messsages</td>
            <td></td>
            <td ></td>
            <td></td>
          </tr>
          <tr className=" bg-blue-400   font-semibold text-white ">
            <td className="p-2">Name</td>
            <td>Email</td>
            <td>Message</td>
            <td></td>
          </tr>
          {contact.map((data) => (
            <tr className=" even:bg-slate-100 ">
              <td className=" p-1">{data.name}</td>
              <td>{data.email}</td>
              <td>{data.message}</td>
              <td className="    text-red-600    text-center">
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ContactDisplay;
