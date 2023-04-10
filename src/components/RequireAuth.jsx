import React from "react";
import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  // console.log("allowedRoles", allowedRoles);
  console.log("auth", auth);
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return roles.some((role) => auth?.roles.includes(role)) ? (
    <Outlet />
  ) : !auth?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
