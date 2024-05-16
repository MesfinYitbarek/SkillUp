import React from 'react'

const ContactDisplay = () => {
    const [contact, setContact] = React.useState([]);

  React.useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch('/api/contact/contactDisplay');
        const data = await response.json();
        setContact(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContact();
  }, []);

  return (
    <div>
      <div>
        <table>
            {contact.map(data => (
                <tr>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.message}</td>
               </tr>
            ))}
            
        </table>
      </div>
    </div>
  )
}

export default ContactDisplay
