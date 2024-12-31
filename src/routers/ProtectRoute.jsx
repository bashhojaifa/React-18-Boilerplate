import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { isLogin } from "../utils/tokenHelper";

// Protects routes by checking if the user is logged in
const ProtectedRoute = () => {
  const { pathname } = useLocation();

  return isLogin() ? <Navigate to={pathname} /> : <Outlet />;
};

export default ProtectedRoute;
