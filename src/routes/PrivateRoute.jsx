import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userRole, loading } = useAuth();  // userRole must have to available in AuthContext

  useEffect(() => {
    console.log("PrivateRoute userRole:", userRole);
    // Only navigate when the user role is not admin and loading is false
    if (!loading && userRole !== "admin") {
      navigate("/");
    }
  }, [navigate, userRole, loading]);  

  // If still loading, show the custom loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return <>{children}</>;  // Render the children if user is authorized
};

export default PrivateRoute;
