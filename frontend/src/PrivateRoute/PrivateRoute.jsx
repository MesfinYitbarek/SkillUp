
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ allowedRoles = [] }) {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  // Check if user has any of the allowed roles

  if (allowedRoles.length && !allowedRoles.includes(currentUser.role)) {
    // User does not have any of the allowed roles
    return <Navigate to="/" />;
  }

  return <Outlet />; 
}