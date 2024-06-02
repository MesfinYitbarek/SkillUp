import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ChangePassword = () => {
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

  return (
    <div>
      <h2>Change Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleChangePassword}>
        <div>
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;