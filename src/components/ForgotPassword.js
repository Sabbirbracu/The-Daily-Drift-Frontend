import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/password-reset`, {
        email,
      });
      setMessage("Password reset link sent! Check your email.");
      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    } catch (err) {
      setMessage("Error sending reset link. Please try again.");
    }
  };

  return (
    <div className="text-center mt-10">
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
          >
            Send Reset Link
          </button>
        </form>
        {message && <div className="text-sm mt-2">{message}</div>}
      </div>
    </div>
  );
};

export default ForgotPassword;
