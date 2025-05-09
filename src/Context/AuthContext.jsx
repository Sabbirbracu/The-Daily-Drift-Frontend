import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import {
  useGetAccessTokenQuery,
  useLoginMutation,
} from "../features/auth/authSlice";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: newToken } = useGetAccessTokenQuery();
  const [login] = useLoginMutation();

  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    let decodedUser = null;

    try {
      if (token) {
        const user = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (user.exp <= currentTime && newToken) {
          localStorage.setItem("accessToken", newToken);
          token = newToken;
          decodedUser = jwtDecode(newToken);
        } else {
          decodedUser = user;
        }

        setUser(decodedUser);
      } else if (newToken) {
        localStorage.setItem("accessToken", newToken);
        decodedUser = jwtDecode(newToken);
        setUser(decodedUser);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Invalid token", err);
      setUser(null);
    }

    setLoading(false);
  }, [newToken]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };
  const Login = async (formData) => {
    try {
      const result = await login(formData).unwrap();
      if (result?.token) {
        localStorage.setItem("accessToken", result.token);
        setUser(result.user);
        return result;
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading, Login }}>
      {children}
    </AuthContext.Provider>
  );
};
