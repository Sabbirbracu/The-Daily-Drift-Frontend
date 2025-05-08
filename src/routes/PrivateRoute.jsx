import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  if (userRole !== "admin") {
    console.log(userRole);
    return navigate("/");
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
