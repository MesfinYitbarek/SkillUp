import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const ChangePassword = ({ onClose }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New Password and Confirm Password do not match');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const { data } = await axios.put(
        `/api/auth/${currentUser._id}/change-password`,
        { oldPassword, newPassword, confirmPassword },
        config
      );

      setMessage(data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Error changing password');
    }
  };
  const [open, setOpen] = React.useState(true);
  return (
    <div className=' flex flex-col gap-3 p-10 bg-white '>
      <h2 className=' mb-3 text-xl font-bold'>Change Your Password</h2>
      {message &&  <Box sx={{ width: "100%" }}>
                    <Collapse in={open}>
                      <Alert
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 2 }}
                      >
                       <p>{message}</p>
                      </Alert>
                    </Collapse>
                  </Box>
      }
      <form onSubmit={handleChangePassword} className=' flex flex-col gap-1'>
        <div>
          <label className=' font-semibold text-blue-800'>Old Password</label>
          <input
          className=' border bg-slate-50 ml-4 p-1.5 w-full'
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className=' font-semibold text-blue-800'>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className=' border bg-slate-50 ml-4 p-1.5 w-full'
          />
        </div>
        <div>
          <label className='font-semibold text-blue-800'>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className=' border  bg-slate-50 ml-4 p-1.5 w-full'
          />
        </div>
        <div className=' flex justify-center items-center '>
          <button className=' bg-blue-500 p-1.5 text-white mt-5 hover:bg-blue-800 rounded-md' type="submit">Change Password</button>
        </div>
        
      </form>
      <button className=' text-end font-bold' type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ChangePassword;