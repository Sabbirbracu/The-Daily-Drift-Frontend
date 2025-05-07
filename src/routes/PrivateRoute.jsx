import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { userRole } = useAuth();
  

  if (userRole !== "admin") {
    console.log(userRole);
    return <Navigate to="/" replace />;
  }
  
  return <div>{children}</div>;
};

export default PrivateRoute;
