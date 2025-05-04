import { jwtDecode } from "jwt-decode";
import { useGetAccessTokenQuery } from "../../features/auth/authSlice";

const useAuth = () => {
  const { data: newToken } = useGetAccessTokenQuery();

  let token = localStorage.getItem("accessToken");
  let decodedUser = null;

  try {
    if (token) {
      const user = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const isTokenValid = user.exp > currentTime;

      if (!isTokenValid && newToken) {
        localStorage.setItem("accessToken", newToken);
        token = newToken;
        decodedUser = jwtDecode(newToken);
      } else {
        decodedUser = user;
      }

      return {
        userId: decodedUser?.id,
        userRole: decodedUser?.role,
        isTokenValid: decodedUser.exp > Date.now() / 1000,
        token,
      };
    } else {
      return null;
    }
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

export default useAuth;
