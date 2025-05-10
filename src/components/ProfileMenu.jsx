import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth"; // Adjust the path if needed

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth(); // ⬅️ make sure this gives you logout()
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ✅ Call your actual logout logic
    navigate("/"); // Redirect after logout
  };

  return (
    <div className="relative inline-block text-left">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-white text-black text-xl flex items-center justify-center"
      >
        👤
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-50 text-black">
          <ul className="py-1 text-sm">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/dashboard-user/profile")}
            >
              User Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              Settings
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
