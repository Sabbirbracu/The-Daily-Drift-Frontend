import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authSlice";

const Login = () => {
  const [login, { isError, isLoading, error }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(formData).unwrap();
      if (result?.token) {
        localStorage.setItem("accessToken", result.token);
        localStorage.setItem("role", result.role); // Save role if available
        navigate("/"); // Redirect to home or dashboard after successful login
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="text-center mt-10">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative text-black">
          <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="••••••••"
              />
              <div className="text-right mt-1">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isLoading ? "Sending..." : "Login"}
            </button>
          </form>

          {/* Display error if login fails */}
          {isError && (
            <div className="text-red-500 text-sm mt-2">
              {error?.data?.message || "Login failed"}
            </div>
          )}

          {/* Link to register if user doesn't have an account */}
          <div className="text-center mt-4">
            <span className="text-sm">Don't have an account? </span>
            <Link
              to="/register"
              className="text-sm text-blue-600 hover:underline"
            >
              Register
            </Link>
          </div>

          {/* Close button */}
          <Link to="/">
            <button className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl">
              &times;
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
