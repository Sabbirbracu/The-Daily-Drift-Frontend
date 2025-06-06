import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { logout as logoutAction, useGetAccessTokenQuery, useLoginMutation } from "../features/auth/authSlice";

// Import your RTK APIs and store
import Store from "../app/store";
import { categoryApi } from "../features/category/categoryApi";
import { commentApi } from "../features/comment/commentApi";
import { postApi } from "../features/post/postApi";
import { profileApi } from "../features/Profile/ProfileApi";
import { userApi } from "../features/users/userApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: newToken } = useGetAccessTokenQuery(undefined, {
    skip: typeof localStorage.getItem("accessToken") !== "string",
  });
  const [login] = useLoginMutation();

  const isValidJwt = (jwt) =>
    typeof jwt === "string" && jwt.split(".").length === 3;

  const decodeToken = (token) => {
    if (!token || typeof token !== "string") return null;

    try {
      if (isValidJwt(token)) {
        return jwtDecode(token);
      }
    } catch (err) {
      console.error("Token decoding error:", err);
    }
    return null;
  };

  useEffect(() => {
    const handleToken = () => {
      const storedToken = localStorage.getItem("accessToken");

      if (!storedToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      let decodedUser = decodeToken(storedToken);
      const currentTime = Date.now() / 1000;

      if (decodedUser) {
        if (
          decodedUser.exp <= currentTime &&
          typeof newToken === "string" &&
          isValidJwt(newToken)
        ) {
          localStorage.setItem("accessToken", newToken);
          decodedUser = decodeToken(newToken);
        }
      } else if (typeof newToken === "string" && isValidJwt(newToken)) {
        localStorage.setItem("accessToken", newToken);
        decodedUser = decodeToken(newToken);
      }

      setUser(decodedUser || null);
      setLoading(false);
    };

    handleToken();
  }, [newToken]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);

    // Clear Redux state
    Store.dispatch(logoutAction());
    Store.dispatch(postApi.util.resetApiState());
    Store.dispatch(profileApi.util.resetApiState());
    Store.dispatch(commentApi.util.resetApiState());
    Store.dispatch(userApi.util.resetApiState());
    Store.dispatch(categoryApi.util.resetApiState());

    // Optional: Reload the page to fully reset app state
    // window.location.href = "/";
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
      
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, userRole: user?.role, logout, loading, Login, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
