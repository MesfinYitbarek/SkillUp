import React from 'react'

const Catagory = () => {
    const [catagory, setCatagory] = React.useState([]);

  React.useEffect(() => {
    const fetchCatagory = async () => {
      try {
        const response = await fetch("/api/courses/catagory");
        const data = await response.json();
        setCatagory(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCatagory();
  }, []);
  return (
    <div>
      <div>
        <table>
            {catagory.map(data => (
                <tr>
                <td>{data.name}</td>
                <td>{data.labelName}</td>
                <td><button>Delete</button></td>
                <td><button>Edit</button></td>
               </tr>
            ))}
            
        </table>
      </div>
    </div>
  )
}

export default Catagory
