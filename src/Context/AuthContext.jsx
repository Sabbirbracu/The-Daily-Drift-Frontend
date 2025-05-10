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

  const decodeToken = (token) => {
    try {
      if (typeof token === "string" && token.split(".").length === 3) {
        return jwtDecode(token);
      }
      console.warn("Invalid or malformed token:", token);
    } catch (err) {
      console.error("Token decoding error:", err);
    }
    return null;
  };

  useEffect(() => {
    const handleToken = () => {
      const storedToken = localStorage.getItem("accessToken");
      let decodedUser = decodeToken(storedToken);

      if (decodedUser) {
        const currentTime = Date.now() / 1000;
        if (decodedUser.exp <= currentTime && typeof newToken === "string") {
          localStorage.setItem("accessToken", newToken);
          decodedUser = decodeToken(newToken);
        }
        setUser(decodedUser);
      } else if (typeof newToken === "string") {
        localStorage.setItem("accessToken", newToken);
        decodedUser = decodeToken(newToken);
        setUser(decodedUser);
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    handleToken();
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
        const decoded = decodeToken(result.token);
        setUser(decoded);
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
