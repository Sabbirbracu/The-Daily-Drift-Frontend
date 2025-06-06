import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../features/auth/publicAuthApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await forgotPassword({ email }).unwrap();
      toast.success("Password reset link sent to your email.");
      setEmail(""); // clear email input after success
    } catch (err) {
      console.error("Forgot password error:", err);
      toast.error(err.data?.message || err.error || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-black to-slate-950 p-4">
      <div className="bg-white text-black w-full max-w-md p-10 rounded-3xl shadow-2xl border border-gray-200 animate-fade-in relative">
        <Link to="/">
          <button className="absolute top-4 right-6 text-gray-400 hover:text-red-500 text-2xl font-bold">
            &times;
          </button>
        </Link>

        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="you@example.com"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
