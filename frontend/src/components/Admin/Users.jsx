import React from 'react'



const Users = () => {
    const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user/users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [])
  return (
    <div>
      <div>
        <table>
            {users.map(data => (
                <tr>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>{data.role}</td>
                <td> <img src={data.avatar} alt="profile" className=' rounded-full  w-16 h-16' /> </td>
                <td><button>Delete</button></td>
                <td><button>Edit</button></td>
               </tr>
            ))}
            
        </table>
      </div>
    </div>
  )
}

export default Users
