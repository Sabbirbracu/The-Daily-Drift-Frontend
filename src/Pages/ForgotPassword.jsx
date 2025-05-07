import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", error: "" });

    try {
      const response = await axios.post("/api/auth/password-reset", { email });
      setStatus({ loading: false, message: response.data.message, error: "" });
    } catch (error) {
      setStatus({
        loading: false,
        message: "",
        error: error.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <div className="text-center mt-10">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative text-black">
          <h2 className="text-xl font-semibold text-center mb-4">
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              disabled={status.loading}
            >
              {status.loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {status.message && (
            <div className="text-green-500 text-sm mt-2">{status.message}</div>
          )}
          {status.error && (
            <div className="text-red-500 text-sm mt-2">{status.error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
