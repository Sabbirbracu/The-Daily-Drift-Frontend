import { useNavigate } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user?.role !== "admin") {
    console.log(user?.role);
    return navigate("/");
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
