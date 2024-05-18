import { ArrowRight } from "@mui/icons-material";
import React from "react";
import AdminContainer from "../../Containers/AdminContainer";

const Users = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className="  flex justify-center items-center ">
      <div className=" bg-white rounded-md mt-12 px-10 py-4 ml-16">
        <table className="  text-sky-900   border-separate border-spacing-y-2 min-w-[800px] ">
          <tr className=" ">
            <td className="  text-blue-700 font-bold text-xl ">Users</td>
            <td></td>
            <td></td>
            <td></td>
            <td className=" text-center">
              <button className=" border  text-purple-600 hover:bg-purple-500 hover:text-white border-purple-600 px-4 py-1 mr-1 font-semibold">
                Add <ArrowRight />
              </button>
            </td>
          </tr>
          <tr className=" bg-blue-400    font-semibold text-white ">
            <td className="p-2 ">Name </td>
            <td>Email</td>
            <td>Role</td>
            <td></td>
            <td></td>
          </tr>
          
          {users.map((data) => (
            <tr className=" even:bg-slate-100 "> 
              <td className=" flex gap-3 items-center">
                <img
                  src={data.avatar}
                  alt="profile"
                  className=" rounded-md  w-8 h-8"
                />{" "}
                {data.username}
              </td>
              <td className=" p-1">{data.email}</td>
              <td className=" p-1">{data.role}</td>

              <td className="    text-red-600    text-center">
                <button>Delete</button>
              </td>
              <td className=" text-center text-purple-600 ">
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Users;
