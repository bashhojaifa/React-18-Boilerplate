import React from "react";
import { Outlet } from "react-router-dom";

// Internal dependencies
import { logout } from "../api/services/auth.service";
import { getToken, tokenDecoded } from "../utils/tokenHelper";

// Protects routes by checking if the user has the required role
const PrivateRoute = ({ roles }) => {
  const token = getToken();

  // If no token or role mismatch, log out the user
  if (!token || !roles.includes(tokenDecoded().data.user.role)) {
    logout();
  }

  return <Outlet />; // Render child routes
};

export default PrivateRoute;
