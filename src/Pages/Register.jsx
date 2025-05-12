import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/auth/authSlice";

const Register = () => {
  const [register, { isError, error, isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false); // State for success popup
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData).unwrap();
      console.log(response);

      setFormData({ userName: "", email: "", password: "" });
      setSuccess(true); // Show success popup
      setTimeout(() => {
        setSuccess(false); // Hide the success popup after 3 seconds
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("Registration failed:", err || err.message);
    }
  };

  return (
    <div className="text-center mt-10">
      <>
        {/* Success Popup */}
        {success && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-green-500 text-white p-4 rounded-md shadow-lg">
                <h3 className="text-lg font-semibold">
                  Registration Successful!
                </h3>
                <p>Your account has been created successfully.</p>
              </div>
            </div>
          </div>
        )}

        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative text-black">
            <h2 className="text-xl font-semibold text-center mb-4">Register</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Your name"
                />
              </div>

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
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {isLoading ? "Sending...." : "Register"}
              </button>
            </form>
            {isError && (
              <div className="text-red-500 text-sm mt-2">
                {error?.data?.message || "Something went wrong. Try again!"}
              </div>
            )}

            <div className="text-center mt-3">
              <Link
                to={"/login"}
                className="text-sm text-blue-600 hover:underline"
              >
                Already Have A Account? Login
              </Link>
            </div>

            <Link to={"/"}>
              <button className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl">
                &times;
              </button>
            </Link>
          </div>
        </div>
      </>
    </div>
  );
};

export default Register;
