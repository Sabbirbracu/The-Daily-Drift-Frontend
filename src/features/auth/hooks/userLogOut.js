// import { useNavigate } from "react-router-dom";
// import useAuth from "./useAuth";

// const useLogout = () => {
//   const navigate = useNavigate();
//   const { setUser } = useAuth();

//   const logout = () => {
//     // Clear user data from context, localStorage, cookies, etc.
//     localStorage.removeItem("token"); // if using token-based auth
//     setUser(null); // reset auth state
//     navigate("/login"); // redirect after logout
//   };

//   return { logout };
// };

// export default useLogout;
