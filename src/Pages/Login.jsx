import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";
import Spinner from "../components/Spinner"; // Or wherever your Spinner is
import { useLoginMutation } from "../features/auth/authSlice";
import useAuth from "../features/auth/hooks/useAuth";

const Login = () => {
  const [login, { isError, isLoading, error }] = useLoginMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { Login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await Login(formData);
    if (result) navigate("/");
  };

  return (
    <>
      {isLoading && <FullPageLoader />}

      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="bg-white text-black w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200 animate-fade-in relative">
          <h2 className="text-3xl font-bold text-center text-blue-950 mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center"
            >
              {isLoading ? <Spinner size="sm" /> : "Login"}
            </button>
          </form>

          {isError && (
            <div className="text-red-500 text-sm mt-2 text-center">
              {error?.data?.message || "Login failed"}
            </div>
          )}

          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>

          <Link to="/">
            <button className="absolute top-4 right-6 text-gray-400 hover:text-red-500 text-2xl font-bold">
              &times;
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
